import { Component, OnInit } from '@angular/core';
import { MemberListService } from './member-list.service';
import { User } from './../User';
import {Item} from "../Item";
import {Member} from "../Member"; // Import the User interface or model
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  member: Member[] = [];
  ngOnInit(): void {
    this.loadUsers();
  }
constructor(private memberListServices:MemberListService) {
}
  loadUsers() {
    this.memberListServices.getAllUsers().subscribe(
      (data) => {
        this.member = data;

      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle error, e.g., show error message
      }
    );
  }


}
