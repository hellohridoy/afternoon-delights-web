import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../Member';
import {FormGroup} from "@angular/forms"; // Define this model

@Injectable({
  providedIn: 'root'
})
export class MemberDetailsService {

  private baseUrl = 'http://localhost:8080/afternoon-delights/member'; // Adjust based on your backend URL

  constructor(private http: HttpClient) { }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }

  getProfilePicture(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/profilePicture`, { responseType: 'blob' });
  }
}
