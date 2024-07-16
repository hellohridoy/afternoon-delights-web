import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddMemberService } from './add-member.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  addNewMemberForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  uploadProgress: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: AddMemberService,
    private addmember: UserService
  ) {
    this.addNewMemberForm = this.fb.group({
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      officialPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      designation: ['', Validators.required],
      departments: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        this.fileError = 'Only JPG, PNG, and GIF files are allowed.';
        this.selectedFile = null;
      } else if (this.selectedFile.size > 5 * 1024 * 1024) {
        this.fileError = 'File size must be less than 5MB.';
        this.selectedFile = null;
      } else {
        this.fileError = null;
      }
    }
  }

  onSubmit(): void {
    if (this.addNewMemberForm.valid) {
      const memberData = {
        pin: this.addNewMemberForm.get('pin')!.value,
        name: this.addNewMemberForm.get('name')!.value,
        email: this.addNewMemberForm.get('email')!.value,
        officialPhoneNumber: this.addNewMemberForm.get('officialPhoneNumber')!.value,
        designation: this.addNewMemberForm.get('designation')!.value,
        departments: this.addNewMemberForm.get('departments')!.value,
        unit: this.addNewMemberForm.get('unit')!.value
      };

      this.addmember.addNewMember(memberData).subscribe(
        (response: any) => {
          const memberId = response.id;
          console.log('Member created successfully with ID:', memberId);

          if (this.selectedFile && memberId) {
            this.memberService.uploadProfilePicture(memberId, this.selectedFile).subscribe(
              event => {
                if (typeof event === 'string') {
                  this.uploadProgress = event;
                } else {
                  console.log('Profile picture uploaded successfully', event);
                }
                this.router.navigate(['/member-list']);
              },
              error => {
                console.error('Error uploading profile picture', error);
                this.router.navigate(['/member-list']);
              }
            );
          } else {
            this.router.navigate(['/member-list']);
          }
        },
        error => {
          console.error('Error creating member', error);
        }
      );
    } else {
      this.addNewMemberForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      if (!this.selectedFile) {
        this.fileError = 'Profile image is required.';
      }
    }
  }
}
