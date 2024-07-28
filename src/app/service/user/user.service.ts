import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authApiUrl = 'https://localhost:7120/api/Auth/GetUserRole/getUserRole';

  constructor(private http: HttpClient) {}

  getUserRole(token: string): Observable<any> {
    const url = `${this.authApiUrl}/${token}`;
    return this.http.get<any>(url);
  }
}
