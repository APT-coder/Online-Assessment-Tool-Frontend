import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointService } from './api-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private apiEndpointService: ApiEndpointService) { }

  get<T>(table: string, action: string, params?: any): Observable<T> {
    const url = this.apiEndpointService.getEndpoint(table, action, params);
    return this.http.get<T>(url);
  }

  post<T>(table: string, action: string, data: any): Observable<T> {
    const url = this.apiEndpointService.getEndpoint(table, action);
    return this.http.post<T>(url, data);
  }

  put<T>(table: string, action: string, data: any, params?: any): Observable<T> {
    const url = this.apiEndpointService.getEndpoint(table, action, params);
    return this.http.put<T>(url, data);
  }

  delete<T>(table: string, action: string, params?: any): Observable<T> {
    const url = this.apiEndpointService.getEndpoint(table, action, params);
    return this.http.delete<T>(url);
  }
}
