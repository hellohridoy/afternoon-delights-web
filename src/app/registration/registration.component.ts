import { Component } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService) { }

  onSubmit() {
    this.userService.register(this.registrationForm).subscribe(
      (response) => {
        console.log('Registration successful:', response);

      },
      (error) => {
        console.error('Registration failed:', error);
        // Handle error, e.g., show error message
      }
    );
  }
}
