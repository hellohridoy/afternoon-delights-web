import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../Item';
import { MemberSelection } from './member-selection';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getFoodItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/food-items`);
  }

  saveFoodItem(foodItem: Item): Observable<Item> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Item>(`${this.apiUrl}/food-items`, foodItem, { headers });
  }

  updateFoodItem(foodItem: Item): Observable<Item> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Item>(`${this.apiUrl}/food-items/${foodItem}`, foodItem, { headers });
  }

  getMemberSelections(): Observable<MemberSelection[]> {
    return this.http.get<MemberSelection[]>(`${this.apiUrl}/member-selections`);
  }

  saveMemberSelection(selection: MemberSelection): Observable<MemberSelection> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<MemberSelection>(`${this.apiUrl}/member-selections`, selection, { headers });
  }
  trackByDate(index: number, item: Item): string {
    return item.date;
  }

}
