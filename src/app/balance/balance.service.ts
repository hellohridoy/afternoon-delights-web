import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BalanceService {


  private baseUrlForMember = 'http://localhost:8080/afternoon-delights/member';
  private baseUrlForMemberMeal = 'http://localhost:8080/afternoon-delights/daily-meal';
  private baseUrlForBalanced = 'http://localhost:8080/afternoon-delights/balance';

  constructor(private http: HttpClient) { }



  getAllUsersPin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlForMember}/all-members-pins`);
  }

  addDailyMealInfo(dailyMealDetails:any):Observable<any>{
    return this.http.post<any[]>(`${this.baseUrlForMemberMeal}/add-meal`,dailyMealDetails);
  }

  addBalanced(balance:any):Observable<any>{
    return this.http.post<any[]>(`${this.baseUrlForBalanced}/add-balance`,balance);
  }

}
