import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MemberListService} from "../member-list/member-list.service";


@Component({
  selector: 'app-update-member-modal',
  templateUrl: './update-member-modal.component.html',
  styleUrls: ['./update-member-modal.component.css']
})
export class UpdateMemberModalComponent {
  updateMemberForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateMemberModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private memberService: MemberListService
  ) {
    this.updateMemberForm = this.fb.group({
      id: [data.id],
      pin: [data.pin, [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      officialPhoneNumber: [data.officialPhoneNumber],
      designation: [data.designation, Validators.required],
      departments: [data.departments, Validators.required],
      unit: [data.unit, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateMemberForm.valid) {
      this.memberService.updateMember(this.updateMemberForm.value).subscribe((response: any) => {
        this.dialogRef.close(response);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
