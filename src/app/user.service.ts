import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "./User";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin`);
  }

  getProfile(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile?username=${username}`);
  }

  addMoney(username: string, amount: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/profile/addMoney`, null, {
      params: { username, amount: amount.toString() }
    });
  }

}
