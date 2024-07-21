import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '../api-service/api-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private apiEndpointService: ApiEndpointService) {}

  getUserById(userId: number): Observable<any> {
    const url = this.apiEndpointService.getEndpoint('users', 'getById', { id: userId});
    return this.http.get<any>(url);
  }
}
