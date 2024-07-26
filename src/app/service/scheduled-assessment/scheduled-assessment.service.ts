import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduledAssessmentService {

  scheduleAssessmentApiUrl = `https://localhost:7120//ScheduledAssessment`

  constructor(private http: HttpClient) {}

  scheduleAssessment(ScheduledAssessment: any): Observable<any> {
    return this.http.post<any>(`${this.scheduleAssessmentApiUrl}/PostScheduledAssessment`, ScheduledAssessment);
  }
}
