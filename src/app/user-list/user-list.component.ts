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
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.loadUsers();
    this.loadMemberSelections();
  }

  loadInitialData() {
    this.http.get<Item[]>('http://localhost:8080/api/food-items/get-item-cost').subscribe(
      displayedItems => {
        this.items = displayedItems;
        this.updateDisplayedData();
      },
      error => {
        console.error('Error fetching initial data:', error);
      }
    );
  }

  loadUsers() {
    this.http.get<Member[]>('http://localhost:8080/afternoon-delights/members/all-members').subscribe(
      data => {
        this.membersPin = data.map(member => ({ pin: member.pin.trim() }));
        console.log('Members Pin:', this.membersPin);
        this.updateDisplayedData();
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadMemberSelections() {
    this.http.get<any[]>('http://localhost:8080/api/member-selections').subscribe(
      selections => {
        selections.forEach((selection: { pin: string; date: string; selected: boolean }) => {
          if (!this.userCheckboxes[selection.pin]) {
            this.userCheckboxes[selection.pin] = {};
          }
          this.userCheckboxes[selection.pin][selection.date] = selection.selected;
        });
        this.updateDisplayedData();
      },
      error => {
        console.error('Error fetching member selections:', error);
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
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  updateDisplayedItems() {
    this.displayedItems = this.initialItemAndCost.map(date => {
      let item: Item | undefined = this.items.find(i => i.date === date);
      if (!item) {
        item = { date, description: '', amount: 0, foodItem: '', price: 0 };
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

    this.http.post('http://localhost:8080/api/member-selections', memberSelection).subscribe(
      response => {
        console.log('Selection saved:', response);
      },
      error => {
        console.error('Error saving selection:', error);
      }
    );
  }

  saveFoodItemWithDelay(foodItem: Item): void {
    setTimeout(() => {
      this.saveFoodItem(foodItem).subscribe(
        (response: Item) => {
          console.log('Food item saved:', response);
          this.updateDisplayedItem(response);
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

  updateDisplayedItem(updatedItem: Item): void {
    const index = this.displayedItems.findIndex(item => item.date === updatedItem.date);
    if (index !== -1) {
      this.displayedItems[index] = updatedItem;
    }
  }

  fetchSavedFoodItems(): void {
    this.listService.getFoodItems().subscribe(
      displayedItems => {
        this.displayedItems = displayedItems;
        this.updateDisplayedData();
      },
      error => {
        console.error('Error fetching food items:', error);
      }
    );
  }

  generatePostRequestPayload(): { [key: string]: any[] } {
    const payload: { [key: string]: any[] } = {};

    this.initialItemAndCost.forEach((date) => {
      const foodItemData = this.displayedItems.find(item => item.date === date);
      const pinsForDate = this.membersPin
        .filter(member => this.userCheckboxes[member.pin] && this.userCheckboxes[member.pin][date])
        .map(member => member.pin);

      if (foodItemData) {
        const { description: foodItem, amount: totalCost } = foodItemData;
        if (!payload[date]) {
          payload[date] = [];
        }

        payload[date].push({
          id: Math.random(),
          date,
          foodItem,
          totalCost,
          pins: pinsForDate,
        });
      }
    });

    return payload;
  }

  sendPostRequest(): void {
    const payload = this.generatePostRequestPayload();
    console.log('Payload to send:', payload);

    this.http.post(this.apiUrl, payload).subscribe(
      response => {
        console.log('POST request successful:', response);
      },
      error => {
        console.error('Error in POST request:', error);
      }
    );
  }

  protected readonly Date = Date;
}
