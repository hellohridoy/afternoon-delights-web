import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListService } from './list.service';

interface Member {
  pin: string;
}

interface Item {
  date: string;
  description: string;
  amount: number;
  foodItem: string;
  price: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/api/food-items';
  displayedItems: Item[] = [];
  membersPin: Member[] = [];
  items: Item[] = [];
  initialItemAndCost: string[] = [];
  currentStartDate: Date = new Date();
  itemsPerPage: number = 7; // Show 7 items per page
  userCheckboxes: { [pin: string]: { [date: string]: boolean } } = {};

  constructor(
    private http: HttpClient,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.loadUsers();
    this.loadMemberSelections();
  }

  loadInitialData() {
    // Simulate HTTP call to fetch items
    this.http.get<Item[]>('http://localhost:8080/api/food-items/get-item-cost').subscribe(displayedItems => {
      this.items = displayedItems; // Load all items
      this.updateDisplayedData();
    }, error => {
      console.error('Error fetching initial data:', error);
    });
  }

  loadUsers() {
    // Simulate HTTP call to fetch users
    this.http.get<Member[]>('http://localhost:8080/afternoon-delights/member/all-members-pins').subscribe(
      data => {
        this.membersPin = data.map(member => ({ pin: member.pin.trim() })); // Trim any trailing spaces
        console.log('Members Pin:', this.membersPin); // Log for debugging
        this.updateDisplayedData();
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadMemberSelections() {
    // Simulate HTTP call to fetch member selections
    this.http.get<any[]>('http://localhost:8080/api/member-selections').subscribe(selections => {
      selections.forEach((selection: { pin: string; date: string; selected: boolean; }) => {
        if (!this.userCheckboxes[selection.pin]) {
          this.userCheckboxes[selection.pin] = {};
        }
        this.userCheckboxes[selection.pin][selection.date] = selection.selected;
      });
      this.updateDisplayedData();
    }, error => {
      console.error('Error fetching member selections:', error);
    });
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
      let item: Item | undefined = this.items.find(i => i.date === date);
      if (!item) {
        item = { date, description: '', amount: 0, foodItem: '', price: 0 }; // default item
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
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() - this.itemsPerPage);
    this.currentStartDate = newStartDate;
    this.updateDisplayedData();
  }

  getDayName(date: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  }

  showNext() {
    const newStartDate = new Date(this.currentStartDate);
    newStartDate.setDate(this.currentStartDate.getDate() + this.itemsPerPage);
    this.currentStartDate = newStartDate;
    this.updateDisplayedData();
  }

  checkBoxChange(pin: string, date: string) {
    const selected = this.userCheckboxes[pin][date];
    const memberSelection = { pin, date, selected };

    this.http.post('http://localhost:8080/api/member-selections', memberSelection)
      .subscribe(response => {
        console.log('Selection saved:', response);
      }, error => {
        console.error('Error saving selection:', error);
      });
  }

  saveFoodItemWithDelay(foodItem: Item): void {
    setTimeout(() => {
      this.saveFoodItem(foodItem).subscribe(
        (response: Item) => {
          console.log('Food item saved:', response);
          this.updateDisplayedItem(response); // Update displayed item with the new data
        },
        (error: any) => {
          console.error('Error saving food item:', error);
        }
      );
    }, 5000);
  }

  saveFoodItem(foodItem: Item): Observable<Item> {
    return this.listService.saveFoodItem(foodItem);
  }

  updateDisplayedItem(updatedItem: Item): void {
    const index = this.displayedItems.findIndex(item => item.date === updatedItem.date);
    if (index !== -1) {
      this.displayedItems[index] = updatedItem; // Update the item in the displayed list
    }
  }

  fetchSavedFoodItems(): void {
    this.listService.getFoodItems().subscribe(
      displayedItems => {
        this.displayedItems = displayedItems;
        this.updateDisplayedData(); // Update the displayed data with the new items
      },
      error => {
        console.error('Error fetching food items:', error);
      }
    );
  }

  protected readonly Date = Date;
}
