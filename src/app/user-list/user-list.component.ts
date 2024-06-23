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
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle error, e.g., show error message
      }
    );
  }
}
