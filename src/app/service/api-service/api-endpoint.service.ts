import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {
  private configUrl = 'assets/api-endpoints.json';
  private endpoints: any;
  private baseUrl!: string;

  constructor(private http: HttpClient) { }

  loadEndpoints(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      map((data: any) => {
        this.baseUrl = data.baseUrl;
        this.endpoints = data;
        return this.endpoints;
      })
    );
  }

  getEndpoint(table: string, action: string, params?: any): string {
    let endpoint = this.endpoints[table][action];
    if (params) {
      Object.keys(params).forEach(key => {
        endpoint = endpoint.replace(`{${key}}`, params[key]);
      });
    }
    return `${this.baseUrl}${endpoint}`;
  }
}
