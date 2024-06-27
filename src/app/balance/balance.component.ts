import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {MealService} from "./meal.service";
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit{
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  balancedForm: FormGroup;
  constructor(private fb:FormBuilder,private dropdownService: MealService) {
    this.balancedForm = this.fb.group({});
  }
  ngOnInit(): void {
    this.balancedForm = this.fb.group({
      item: ['', Validators.required],
      participants: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      perHeadAmount: [null, [Validators.required, Validators.min(0)]]
    });

    this.dropdownService.getAllUsersPin().subscribe((data: any) => {
      this.dropdownList = data.map((item: { id: any; name: any; }) => {
        console.log(item)
        return {item_id: item, item_text: item};
      });
      console.log(this.dropdownList);
    });

    // this.dropdownService.getAllUserPinSeletedItem().subscribe((data: any) => {
    //   this.dropdownList = data.map((item: { id: any; name: any; }) => {
    //     return {item_id: item.id, item_text: item.name};
    //   });
    // });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }


  onSubmit(): void {
    if (this.balancedForm.valid) {
      console.log(this.balancedForm.value);
      // Handle form submission
    }
  }




}
