import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BalanceService } from './balance.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  balancedForm: FormGroup;

  constructor(private fb: FormBuilder, private balanceService: BalanceService, private router: Router) {
    this.balancedForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.balancedForm = this.fb.group({
      item: ['', Validators.required],
      participants: [[], Validators.required],  // Form control for selected items
      price: [null, [Validators.required, Validators.min(0)]],
      perHeadAmount: [null, [Validators.required, Validators.min(0)]]
    });

    this.balanceService.getAllUsersPin().subscribe((data: any) => {
      this.dropdownList = data.map((item: string) => ({
        item_id: item,
      }));
      console.log(this.dropdownList);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'pin',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    // @ts-ignore
    this.selectedItems.push(item);
    this.balancedForm.patchValue({
      participants: this.selectedItems
    });
  }

  onSelectAll(items: any) {
    this.selectedItems = items;
    this.balancedForm.patchValue({
      participants: this.selectedItems
    });
  }

  onSubmit(): void {
    if (this.balancedForm.valid) {
      this.balanceService.addDailyMealInfo(this.balancedForm.value).subscribe(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Member Added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        console.log('Member added successfully');
        this.router.navigate(['/user-list']);
      });
    }
  }
}
