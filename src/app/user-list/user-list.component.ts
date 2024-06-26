// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from './../User';
import {Item} from "../Item"; // Import the User interface or model

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  checked:boolean=false;
  users: User[] = [];
  items: Item[] = [
    { date: 'May 1', description: '', amount: 0.0, flag1: false,  },
    { date: 'May 2', description: '', amount: 0.0, flag1: true,},
    { date: 'May 3', description: '', amount: 0.0, flag1: false,  },
    { date: 'May 4', description: '', amount: 0.0, flag1: false,},
    { date: 'May 5', description: '', amount: 0.0, flag1: true, },
    { date: 'May 6', description: '', amount: 0.0, flag1: true,},
    { date: 'May 7', description: '', amount: 0.0, flag1: false, },
    { date: 'May 8', description: '', amount: 0.0, flag1: false,  },
    { date: 'May 9', description: '', amount: 0.0, flag1: true,},
    { date: 'May 10', description: '', amount: 0.0, flag1: false, },
    { date: 'May 11', description: '', amount: 0.0, flag1: false,  },
    { date: 'May 12', description: '', amount: 0.0, flag1: true, },
    { date: 'May 13', description: '', amount: 0.0, flag1: true, },
    { date: 'May 14', description: '', amount:0.0, flag1: false,  },
    { date: 'May 15', description: '', amount: 0.0, flag1: true, },
    { date: 'May 16', description: '', amount: 0.0, flag1: true,  },
    { date: 'May 17', description: '', amount: 0.0, flag1: false,  },
    { date: 'May 18', description: '', amount: 0.0, flag1: false,  },
    { date: 'May 19', description: '', amount: 0.0, flag1: true, },
    { date: 'May 20', description: '', amount: 0.0, flag1: true, },
    { date: 'May 21', description: '', amount: 0.0, flag1: true, },
    { date: 'May 22', description: '', amount: 0.0, flag1: false, },
    { date: 'May 23', description: '', amount: 0.0, flag1: true, },
    { date: 'May 24', description: '', amount: 0.0, flag1: false, },
    { date: 'May 25', description: '', amount: 0.0, flag1: false,  },
    { date: 'May 26', description: '', amount: 0.0, flag1: true,  },
    { date: 'May 27', description: '', amount: 0.0, flag1: true,},
    { date: 'May 28', description: '', amount: 0.0, flag1: true, },
    { date: 'May 29', description: '', amount: 0, flag1: true, },
    { date: 'May 30', description: '', amount: 0.0, flag1: false, },
    { date: 'May 31', description: '', amount: 0.0, flag1: false,  }
  ];

  daysInMonth: string[] = [
    'May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7', 'May 8',
    'May 9', 'May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15',
    'May 16', 'May 17', 'May 18', 'May 19', 'May 20', 'May 21', 'May 22',
    'May 23', 'May 24', 'May 25', 'May 26', 'May 27', 'May 28', 'May 29',
    'May 30', 'May 31'
  ];

  displayedDates: string[] = [];
  displayedItems: Item[] = [];
  currentStartIndex: number = 0;
  itemsPerPage: number = 7;
  userCheckboxes: any = {};
  isPreviousDisabled: boolean = true;
  isNextDisabled: boolean = false;



  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.loadUsers();
    this.updateDisplayedData();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.initializeCheckboxes();
      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle error, e.g., show error message
      }
    );
  }

  initializeCheckboxes(): void {
    this.users.forEach(user => {
      this.userCheckboxes[user.username] = {};
      this.daysInMonth.forEach(day => {
        this.userCheckboxes[user.username][day] = false;
      });
    });
  }

  updateDisplayedData() {
    this.displayedDates = this.daysInMonth.slice(this.currentStartIndex, this.currentStartIndex + this.itemsPerPage);
    this.displayedItems = this.items.slice(this.currentStartIndex, this.currentStartIndex + this.itemsPerPage);
    this.isPreviousDisabled = this.currentStartIndex === 0;
    this.isNextDisabled = this.currentStartIndex + this.itemsPerPage >= this.daysInMonth.length;
  }

  showPrevious() {
    if (this.currentStartIndex - this.itemsPerPage >= 0) {
      this.currentStartIndex -= this.itemsPerPage;
      this.updateDisplayedData();
    }
  }

  showNext() {
    if (this.currentStartIndex + this.itemsPerPage < this.daysInMonth.length) {
      this.currentStartIndex += this.itemsPerPage;
      this.updateDisplayedData();
    }
  }

  checkBoxChange() {
    this.checked = true;
  }
}
