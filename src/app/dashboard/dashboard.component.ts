import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  totalBalance: number | undefined;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getTotalBalance();
  }
  getTotalBalance(): void {
    this.dashboardService.getTotalBalance().subscribe(
      (data: number) => {
        this.totalBalance = data;
      },
      (error: any) => {
        console.error('Error fetching total balance', error);
      }
    );
  }
}
