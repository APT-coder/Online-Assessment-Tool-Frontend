import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '../api-service/api-endpoint.service';

interface Trainee {
  traineeName: string;
  isPresent: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceDetailsService {

  private apiUrl = 'https://localhost:7120/Assessment/GetTraineeAssessmentDetails/GetTraineeAssessmentDetails'; // Replace with your actual API URL

  constructor(private http: HttpClient, private apiEndpointService: ApiEndpointService) { }

  getTrainees(assessmentId : number): Observable<Trainee[]> {
    const url = this.apiEndpointService.getEndpoint('assessments', 'getTraineeScoresByAssessmentId', {assessmentId: assessmentId});
    return this.http.get<Trainee[]>(url);
  }
}
