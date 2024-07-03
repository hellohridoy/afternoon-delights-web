import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
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

  constructor(private fb: FormBuilder) {
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
      console.log(this.balanceForm.value);

    }
  }
}
