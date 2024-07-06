import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {

  private apiUrl = 'http://localhost:8080/afternoon-delights/member';
  private baseUrlForMember = 'http://localhost:8080/afternoon-delights/member';

  constructor(private http: HttpClient) {}

  uploadProfilePicture(memberId: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/${memberId}/uploadProfilePicture`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  globalSearchWithPinEmailOfficialPhoneNumber(keyword:any):Observable<any>{
    return this.http.get(`${this.baseUrlForMember}/search`, { params: { keyword } });
  }
}
