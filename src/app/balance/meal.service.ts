import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MealService {


  private baseUrlForMember = 'http://localhost:8080/afternoon-delights/member';

  constructor(private http: HttpClient) { }



  getAllUsersPin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlForMember}/all-members-pins`);
  }

  getAllUserPinSeletedItem():Observable<any>{
    return this.http.get<any[]>(`${this.baseUrlForMember}'/selected'`);
  }

}
