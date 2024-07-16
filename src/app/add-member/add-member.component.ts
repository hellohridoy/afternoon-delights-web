import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  addNewMemberForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {
    this.addNewMemberForm = this.fb.group({
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      officialPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      designation: ['', Validators.required],
      departments: ['', Validators.required],
      unit: ['', Validators.required],
      balance: ['', [Validators.required, Validators.pattern('^\\d+\\.?\\d{0,2}$')]],
      profileImage: [null]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.size > 0) {
      this.selectedFile = file;
      this.fileError = null;
    } else {
      this.fileError = 'Please select a valid file.';
    }
  }

  onSubmit(): void {
    if (this.addNewMemberForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('pin', this.addNewMemberForm.get('pin')?.value);
    formData.append('name', this.addNewMemberForm.get('name')?.value);
    formData.append('email', this.addNewMemberForm.get('email')?.value);
    formData.append('officialPhoneNumber', this.addNewMemberForm.get('officialPhoneNumber')?.value);
    formData.append('designation', this.addNewMemberForm.get('designation')?.value);
    formData.append('departments', this.addNewMemberForm.get('departments')?.value);
    formData.append('unit', this.addNewMemberForm.get('unit')?.value);
    formData.append('balance', this.addNewMemberForm.get('balance')?.value);

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile, this.selectedFile.name);
    }

    this.userService.addNewMember(formData).subscribe(
      response => {
        console.log('Member added successfully', response);
        this.router.navigate(['/members']); // Navigate to the members list page or another appropriate page
      },
      error => {
        console.error('Error adding member', error);
      }
    );
  }
}
