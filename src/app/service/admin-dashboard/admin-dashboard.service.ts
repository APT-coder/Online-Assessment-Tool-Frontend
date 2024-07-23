import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Performers } from '../../../models/performers.interface';
import { ApiResponses } from '../../../models/apiResponse.interface'; 
import { AdminChartResponse } from '../../../models/adminChartResponse.interface'; 

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private baseApiUrl = 'https://localhost:7120/api/Assessment';
  private chartApiUrl='https://localhost:7120/AssessmentScore/GetAssessment';

  constructor(private http: HttpClient) { }
  getAllAssessmentOverviews(): Observable<ApiResponses> {
    return this.http.get<ApiResponses>(`${this.baseApiUrl}/GetAllAssessmentOverviews/overview`);
  }
  

  getHighPerformers(assessmentId: number): Observable<Performers[]> {
    return this.http.get<Performers[]>(`${this.baseApiUrl}/GetHighPerformers/highperformers/${assessmentId}`);
  }

  getLowPerformers(assessmentId: number): Observable<Performers[]> {
    return this.http.get<Performers[]>(`${this.baseApiUrl}/GetLowPerformers/lowperformers/${assessmentId}`);
  }

  getChartValues(assessmentId: number):Observable<AdminChartResponse>{
    return this.http.get<AdminChartResponse>(`${this.chartApiUrl}/${assessmentId}`)
  }
}
