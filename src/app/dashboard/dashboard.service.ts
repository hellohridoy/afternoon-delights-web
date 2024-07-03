import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/afternoon-delights/balance';

  constructor(private http: HttpClient) { }

  getTotalBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }
}
