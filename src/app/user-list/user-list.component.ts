import { Component, OnInit } from '@angular/core';
import { Member } from '../Member';
import { Item } from '../Item';
import { BalanceService } from '../balance/balance.service';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedItems: Item[] = [];
  membersPin: Member[] = [];
  items: Item[] = [];
  initialItemAndCost: string[] = [];
  currentStartDate: Date = new Date();
  itemsPerPage: number = 7; // Show 7 items per page
  userCheckboxes: { [pin: string]: { [date: string]: boolean } } = {};

  constructor(
    private balanceService: BalanceService,
    private http: HttpClient,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadFoodItems();
    this.loadMemberSelections();
    this.loadInitialData();
  }

  loadInitialData() {
    this.listService.getFoodItems().subscribe(
      items => {
        this.items = items;
        this.updateDisplayedData();
      },
      error => {
        console.error('Error fetching initial data:', error);
      }
    );
  }

  loadUsers() {
    this.balanceService.getAllUsersPin().subscribe(
      data => {
        this.membersPin = data;
        this.updateDisplayedData();
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  updateDisplayedData() {
    const endDate = new Date(this.currentStartDate);
    endDate.setDate(endDate.getDate() + this.itemsPerPage - 1);
    this.initialItemAndCost = this.generateDateRange(this.currentStartDate, endDate);
    this.updateDisplayedItems();
    this.initializeCheckboxes();
  }

  generateDateRange(startDate: Date, endDate: Date): string[] {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  updateDisplayedItems() {
    this.displayedItems = this.initialItemAndCost.map(date => {
      let item = this.items.find(i => i.date === date);
      if (!item) {
        item = { date, description: '', amount: 0 }; // default item
        this.items.push(item);
      }
      return item;
    });
  }

  initializeCheckboxes(): void {
    this.membersPin.forEach(pin => {
      if (!this.userCheckboxes[pin.pin]) {
        this.userCheckboxes[pin.pin] = {};
      }
      this.initialItemAndCost.forEach(day => {
        if (this.userCheckboxes[pin.pin][day] === undefined) {
          this.userCheckboxes[pin.pin][day] = false;
        }
      });
    });
  }

  showPrevious() {
    this.currentStartDate.setDate(this.currentStartDate.getDate() - this.itemsPerPage);
    this.updateDisplayedData();
  }

  showNext() {
    this.currentStartDate.setDate(this.currentStartDate.getDate() + this.itemsPerPage);
    this.updateDisplayedData();
  }

  checkBoxChange(pin: string, date: string) {
    const selected = this.userCheckboxes[pin][date];
    const memberSelection = { pin, date, selected };

    this.http.post('http://localhost:8080/api/member-selections', memberSelection)
      .subscribe(response => {
        console.log('Selection saved:', response);
        this.updateDisplayedData();
      }, error => {
        console.error('Error saving selection:', error);
        this.updateDisplayedData();
      });
  }

  loadFoodItems() {
    this.listService.getFoodItems().subscribe(items => {
      this.items = items;
      this.updateDisplayedData();
    });
  }

  loadMemberSelections() {
    this.listService.getMemberSelections().subscribe(selections => {
      selections.forEach((selection: { pin: string; date: string; selected: boolean; }) => {
        if (!this.userCheckboxes[selection.pin]) {
          this.userCheckboxes[selection.pin] = {};
        }
        this.userCheckboxes[selection.pin][selection.date] = selection.selected;
      });
      this.updateDisplayedData();
    });
  }

  saveFoodItemWithDelay(foodItem: Item): void {
    setTimeout(() => {
      this.saveFoodItem(foodItem).subscribe(
        response => {
          console.log('Food item saved:', response);
          this.updateDisplayedData();
          this.fetchSavedFoodItems(); // Fetch the saved items after saving
        },
        error => {
          console.error('Error saving food item:', error);
        }
      );
    }, 5000);
  }

  saveFoodItem(foodItem: Item): Observable<Item> {
    return this.listService.saveFoodItem(foodItem);
  }

  updateFoodItem(foodItem: Item): void {
    this.listService.getFoodItems().subscribe(
        (response: any) => {
        console.log('Food item updated:', response);
        this.updateDisplayedData();
      },
        (error: any) => {
        console.error('Error updating food item:', error);
      }
    );
  }

  fetchSavedFoodItems(): void {
    this.listService.getFoodItems().subscribe(
      items => {
        this.items = items;
        this.updateDisplayedData(); // Update the displayed data with the new items
      },
      error => {
        console.error('Error fetching food items:', error);
      }
    );
  }
}
