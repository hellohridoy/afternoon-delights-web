// member-details.component.ts
import {Component, NgIterable, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../Member';
import { MemberDetailsService } from './member-details.service';
import {MatDialog} from "@angular/material/dialog";
import {AddMoneyModalComponent} from "../add-money-modal/add-money-modal.component";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: Member | undefined;
  profilePicture: string | undefined;
  memberId: number;
  members:any;
  balanceHistories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberDetailsService,
    public dialog: MatDialog
  ) {
    this.memberId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const memberId = params['id']; // Assuming 'id' is the route parameter for member ID
      if (memberId) {
        this.fetchMember(memberId); // Fetch member data based on ID
        this.handleProfilePicture(memberId); // Fetch profile picture based on ID
      } else {
        console.error('Member ID not found in route parameters');
        // Handle error (e.g., redirect or error message)
      }
    });
  }

  fetchMember(memberId: number): void {
    this.memberService.getMember(memberId).subscribe(
      (member: Member) => {
        this.member = member;
      },
      (error: any) => {
        console.error('Error fetching member:', error);
        // Handle error (e.g., redirect or error message)
      }
    );
  }

  loadProfilePicture(memberId: number): void {
    this.memberService.getProfilePicture(memberId).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.profilePicture = event.target.result;
        };
        reader.readAsDataURL(blob);
      },
      (error: any) => {
        console.error('Error fetching profile picture:', error);
        // Handle error (e.g., show default profile picture or error message)
      }
    );
  }




  handleProfilePicture(memberId: number): void {
    console.log('Profile picture clicked for member ID:', memberId);
    this.loadProfilePicture(memberId);
  }

  navigateToMembers(): void {
    this.router.navigate(['/member-list']);
  }
  openAddMoneyModal(): void {
    const dialogRef = this.dialog.open(AddMoneyModalComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchBalanceHistory(result.pin);
      }
    });
  }
  fetchBalanceHistory(pin: string): void {
    this.memberService.getBalanceHistory(pin).subscribe(data => {
      this.balanceHistories = data;
    });
  }

}
