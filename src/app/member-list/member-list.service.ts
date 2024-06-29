import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MemberListService {


  private baseUrlForMember = 'http://localhost:8080/afternoon-delights/member';

  constructor(private http: HttpClient) { }



  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlForMember}/all`);
  }



}
