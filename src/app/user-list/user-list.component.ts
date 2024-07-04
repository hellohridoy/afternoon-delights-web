import { Component, OnInit } from '@angular/core';
import { Member } from '../Member';
import { Item } from '../Item';
import { BalanceService } from '../balance/balance.service';
import { HttpClient } from '@angular/common/http';
import { ListService } from './list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  checked: boolean = false;
  membersPin: Member[] = [];
  items: Item[] = [];
  displayedDates: string[] = [];
  displayedItems: Item[] = [];
  currentStartDate: Date = new Date();
  itemsPerPage: number = 7;
  userCheckboxes: { [pin: string]: { [date: string]: boolean } } = {};

  constructor(private balanceService: BalanceService, private http: HttpClient, private listService: ListService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.updateDisplayedData();
    this.loadFoodItems();
    this.loadMemberSelections();
  }

  loadUsers() {
    this.balanceService.getAllUsersPin().subscribe(
      (data) => {
        this.membersPin = data;
        this.initializeCheckboxes();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  initializeCheckboxes(): void {
    this.membersPin.forEach(pin => {
      this.userCheckboxes[pin.pin] = {};
      this.displayedDates.forEach(day => {
        this.userCheckboxes[pin.pin][day] = false;
      });
    });
  }

  updateDisplayedData() {
    const endDate = new Date(this.currentStartDate);
    endDate.setDate(endDate.getDate() + this.itemsPerPage - 1);
    this.displayedDates = this.generateDateRange(this.currentStartDate, endDate);
  }

  generateDateRange(startDate: Date, endDate: Date): string[] {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateArray.push(currentDate.toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
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

    this.listService.getMemberSelections()
      .subscribe(response => {
        console.log('Selection saved:', response);
      }, error => {
        console.error('Error saving selection:', error);
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
    });
  }
}
