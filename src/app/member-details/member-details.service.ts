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
  private baseUrlForBalanceHistory = 'http://localhost:8080/balance-history/member'; // Adjust based on your backend URL
  private apiUrl = 'http://localhost:8080/balance-history/add-balance';
  private memberPreviousBalanceHistory = 'http://localhost:8080/balance-history';

  constructor(private http: HttpClient) { }

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }

  getProfilePicture(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/profilePicture`, { responseType: 'blob' });
  }
  addBalance(pin: string, amount: number): Observable<any> {
    return this.http.post(this.apiUrl, { pin, amount });
  }

  getBalanceHistory(pin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlForBalanceHistory}/${pin}`);
  }

  getMemberAllPreviousBalance():Observable<any[]> {
    return this.http.get<any[]>(`${this.memberPreviousBalanceHistory}/all`);
  }
}
