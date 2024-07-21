// add-money-modal.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MemberDetailsService} from "../member-details/member-details.service";

@Component({
  selector: 'app-add-money-modal',
  templateUrl: './add-money-modal.component.html',
})
export class AddMoneyModalComponent {
  addMoneyForm: FormGroup;
  private response: any;

  constructor(
    private memberDetailsService: MemberDetailsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMoneyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.addMoneyForm = this.fb.group({
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.addMoneyForm.valid) {
      const pin = this.addMoneyForm.get('pin')?.value;
      const amount = this.addMoneyForm.get('amount')?.value;
      this.memberDetailsService.addBalance(pin,amount).subscribe(response => {
        this.response=response
        this.dialogRef.close(response);
      });
    }
  }
}
