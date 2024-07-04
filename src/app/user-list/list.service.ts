import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrlForFoodItems = 'http://localhost:8080/api/food-items';
  private apiUrlForMemberSelection = 'http://localhost:8080/api/member-selections';
  constructor(private http: HttpClient) {}

  getFoodItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlForFoodItems);
  }

  saveFoodItem(foodItem: any): Observable<any> {
    return this.http.post<any>(this.apiUrlForFoodItems, foodItem);
  }
  getMemberSelections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlForMemberSelection);
  }

  saveMemberSelection(selection: any): Observable<any> {
    return this.http.post<any>(this.apiUrlForMemberSelection, selection);
  }
}
