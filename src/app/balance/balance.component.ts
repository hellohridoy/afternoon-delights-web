import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit{
  balancedForm: FormGroup;
  constructor(private fb:FormBuilder) {
    this.balancedForm = this.fb.group({});
  }
  ngOnInit(): void {
    this.balancedForm = this.fb.group({
      item: ['', Validators.required],
      participants: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      perHeadAmount: [null, [Validators.required, Validators.min(0)]]
    });
  }
  onSubmit(): void {
    if (this.balancedForm.valid) {
      console.log(this.balancedForm.value);
      // Handle form submission
    }
  }

}
