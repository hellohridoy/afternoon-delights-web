import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  loginForm = {
    username: '',
    password: ''
  };


  isLoggedIn = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  onSubmit() {
    this.userService.login(this.loginForm).subscribe(
      (response) => {
        console.log('Login successful:', response);
        console.log('Navigating to profile page for user:', this.loginForm.username);
        this.isLoggedIn = true;      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
