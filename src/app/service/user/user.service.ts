import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '../api-service/api-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7120/Auth/GetUserRole/getUserRole';

  constructor(private http: HttpClient, private apiEndpointService: ApiEndpointService) {}

  getUserRole(token: string): Observable<any> {
    const url = `${this.apiUrl}/${token}`;
    return this.http.get<any>(url);
  }
}
