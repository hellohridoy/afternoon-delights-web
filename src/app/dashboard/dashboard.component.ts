import { Component, OnInit } from '@angular/core';
import {MemberService} from "./dashboard.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.fetchMemberBalanceInfo();
  }

  fetchMemberBalanceInfo(): void {
    this.memberService.getMemberBalanceInfo().subscribe(
      (response: any) => {
        this.data = response;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Data not found.';
        this.isLoading = false;
      }
    );
  }
  getBackgroundColor(index: number): string {
    const colors = [
      '#ffcccc', // Light Red
      '#ccffcc', // Light Green
      '#ccccff', // Light Blue
      '#ffffcc', // Light Yellow
      '#ffccff', // Light Pink
      '#ccffff', // Light Cyan
      '#ffe6cc'  // Light Orange
    ];
    return colors[index % colors.length];
  }

}
