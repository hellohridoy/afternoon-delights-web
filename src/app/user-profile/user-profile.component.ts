import {Component, OnInit} from '@angular/core';
import {User} from "../User";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit{
  user: User | undefined;
  addMoneyAmount: number = 0;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.loadProfile(username);
      }
    });
  }

  loadProfile(username: string) {
    this.userService.getProfile(username).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  addMoney() {
    if (this.user && this.addMoneyAmount > 0) {
      this.userService.addMoney(this.user.username, this.addMoneyAmount).subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Error adding money:', error);
        }
      );
    }
  }


}
