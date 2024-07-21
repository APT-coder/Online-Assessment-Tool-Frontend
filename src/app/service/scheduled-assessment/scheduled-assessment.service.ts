import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '../api-service/api-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduledAssessmentService {

  constructor(private http: HttpClient, private apiEndpointService: ApiEndpointService) {}

  scheduleAssessment(ScheduledAssessment: any): Observable<any> {
    console.log(ScheduledAssessment);
    const url = this.apiEndpointService.getEndpoint('scheduledAssessments', 'create');
    return this.http.post<any>(url, ScheduledAssessment);
  }
}
