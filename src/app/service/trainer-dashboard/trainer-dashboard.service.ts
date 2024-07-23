import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '../api-service/api-endpoint.service';

interface AssessmentTableDTO {
  assessmentId: number;
  assessmentName: string;
  batchName: string;
  createdOn: string;
  scheduledDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrainerDashboardService {
  private apiUrl = 'https://localhost:7120/Assessment/GetAssessmentTable/AssessmentTable';

  constructor(private http: HttpClient, private apiEndpointService: ApiEndpointService) {}

  getAssessments(): Observable<AssessmentTableDTO[]> {
    //const url = this.apiEndpointService.getEndpoint('assessments', 'getTable');
    return this.http.get<AssessmentTableDTO[]>(this.apiUrl);
  }
}
