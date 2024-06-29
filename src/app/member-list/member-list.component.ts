import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {MemberListService} from "./member-list.service";

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: any[] = []; // Replace with actual data type
  addNewMemberForm: FormGroup;
  selectedMember: any;
  closeResult = '';
  private baseUrlForMember: 'http://localhost:8080/afternoon-delights/member' | undefined;
  content: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    this.addNewMemberForm = this.fb.group({
      pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      officialPhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      designation: ['', Validators.required],
      departments: ['', Validators.required],
      unit: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    // Load members from the API
    this.http.get<any[]>(`${this.baseUrlForMember}/all`).subscribe(data => {
      this.members = data;
    });
  }

  open(content: any, member: { [key: string]: any; }): void {
    this.selectedMember = member;
    this.addNewMemberForm.patchValue(member);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        if (result === 'Save click') {
          this.updateMember();
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateMember(): void {
    if (this.addNewMemberForm.valid) {
      const updatedMember = { ...this.selectedMember, ...this.addNewMemberForm.value };
      this.http.put(`${this.baseUrlForMember}/${updatedMember.id}`, updatedMember).subscribe(response => {
        this.loadMembers(); // Refresh the member list
      });
    }
  }
}
