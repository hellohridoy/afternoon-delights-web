import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit{
  addNewMemberForm: FormGroup;

  constructor(private fb: FormBuilder,private userService:UserService,private router:Router) {
    this.addNewMemberForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.addNewMemberForm = this.fb.group({
      pin: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      officialPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      designation: ['', Validators.required],
      departments: ['', Validators.required],
      unit: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.addNewMemberForm.value)
    if (this.addNewMemberForm.valid) {
      this.userService.addNewMember(this.addNewMemberForm.value).subscribe(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Member Added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        console.log("Member added successfully")
        this.router.navigate(['/member-list']);
      });
    } else {
      console.log("Error")
    }
  }
}
