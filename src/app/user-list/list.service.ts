import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MemberSelection} from "../user-profile/member-selection";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:8080/api/member-selections';
  private getFoodItemsAndCost = 'http://localhost:8080/api/food-items/get-item-cost';
  private postFoodItemsAndCost = 'http://localhost:8080/api/food-items/save-item-cost';
  private getMemberSelection = 'http://localhost:8080/api/member-selections/get-member-selection';
  private postMemberSelection =  'http://localhost:8080/api/member-selections/post-member-selection';
  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<any[]> {
    return this.http.get<any[]>(this.getFoodItemsAndCost);
  }

  saveFoodItem(foodItemAndCost: any): Observable<any> {
    return this.http.post<any>(this.postFoodItemsAndCost, foodItemAndCost);
  }
  getMemberSelectionsOld(): Observable<any[]> {
    return this.http.get<any[]>(this.getMemberSelection);
  }

  postMemberSelections(): Observable<any[]> {
    return this.http.get<any[]>(this.postMemberSelection);
  }

  getMemberSelections(): Observable<MemberSelection[]> {
    return this.http.get<MemberSelection[]>(this.apiUrl);
  }

  saveMemberSelection(memberSelection: MemberSelection): Observable<MemberSelection> {
    return this.http.post<MemberSelection>(this.apiUrl, memberSelection);
  }
}
