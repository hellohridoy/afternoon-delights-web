import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BalanceService } from './balance.service';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balancedForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private router:Router

  ) {
    this.balancedForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.balancedForm = this.fb.group({
      item: ['', Validators.required],
      participants: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      perHeadAmount: ['', [Validators.required, Validators.min(0)]]
    });

    this.fetchParticipants();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'pin',
      textField: 'pin',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  fetchParticipants(): void {
    this.balanceService.getAllUsersPin().subscribe(
      data => {
        // @ts-ignore
        this.dropdownList = data;
      },
      error => {
        console.error('Error fetching participants:', error);
      }
    );
  }

  onSubmitBalanced(): void {
    if (this.balancedForm.valid) {
      this.balanceService.addDailyMealInfo(this.balancedForm.value).subscribe(
        response => {
          console.log('Meal added successfully:', response);
          Swal.fire({
            title: 'Success!',
            text: 'Daily Meal Added successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.router.navigate(['/dashboard']);
        },
          (error: any) => {
          console.error('Error adding balance:', error);
          // Handle error response
        }
      );
    }
  }

  onItemSelect(item: any) {
    // @ts-ignore
    this.selectedItems.push(item);
    this.balancedForm.controls['participants'].setValue(this.selectedItems);
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    this.selectedItems = items;
    this.balancedForm.controls['participants'].setValue(this.selectedItems);
    console.log(this.selectedItems);
  }
}
