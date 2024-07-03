import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {BalanceService} from "../balance/balance.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit{
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  balanceForm: FormGroup;

  constructor(private fb: FormBuilder,private balancedService:BalanceService,private router:Router) {
    this.balanceForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.balanceForm = this.fb.group({
      pin: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      balance: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.balanceForm.valid) {
      this.balancedService.addBalanced(this.balanceForm.value).subscribe(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Balance Added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        console.log('Member added successfully');
        this.router.navigate(['/dashboard']);
      });
    }
  }

}
