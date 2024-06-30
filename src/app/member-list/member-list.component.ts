import { Component, OnInit } from '@angular/core';
import { MemberListService } from './member-list.service';
import { User } from './../User';
import {Item} from "../Item";
import { MatDialog } from '@angular/material/dialog';

import {Member} from "../Member";
import * as sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";
import {UpdateMemberModalComponent} from "../update-member-modal/update-member-modal.component"; // Import the User interface or model
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
constructor(private memberListServices:MemberListService,private dialog:MatDialog) {
}
  loadUsers() {
    this.memberListServices.getAllUsers().subscribe(
      (data) => {
        this.member = data;
        console.log(this.member)

      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle error, e.g., show error message
      }
    );
  }
  updateMember(member: Member): void {


  }

  deleteMember(memberId: number): void {
    if (confirm()) {
      this.memberListServices.deleteMember(memberId).subscribe(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Member Delete successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        console.log("delete")
        this.loadUsers();
      });
    }
    else {
      Swal.fire({
        title: 'Failed!',
        text: 'Member Delete successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }

  openUpdateMemberModal(member: any) {
    const dialogRef = this.dialog.open(UpdateMemberModalComponent, {
      width: '400px',
      data: member
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

}
