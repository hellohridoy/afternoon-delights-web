import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddMemberService} from "../add-member/add-member.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchForm: FormGroup;
  searchResults: any[] = [];
  constructor(private router:Router,private fb: FormBuilder, private memberService: AddMemberService) {
    this.searchForm = this.fb.group({
      keyword: ['']
    });
  }

  ngOnInit(): void {
  }

  redirectToPath(path:string){
    this.router.navigate([path]);
  }

  onSearch() {
    const keyword = this.searchForm.get('keyword')?.value;
    this.memberService.globalSearchWithPinEmailOfficialPhoneNumber(keyword).subscribe(
      (results) => {
        this.searchResults = results;
      },
      (error) => {
        console.error('Error searching members:', error);
      }
    );
  }
}
