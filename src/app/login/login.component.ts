import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
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
        Swal.fire({
          title: 'Success!',
          text: 'Login successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/dashboard']);
        },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
