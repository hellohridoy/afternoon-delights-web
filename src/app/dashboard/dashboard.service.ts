import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:8080/afternoon-delights/members/balance-infos'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  getMemberBalanceInfo(searchParams?: string): Observable<any> {
    const url = searchParams ? `${this.apiUrl}?searchParams=${searchParams}` : this.apiUrl;
    return this.http.get<any>(url);
  }
}
