import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private trainerDashboardApiUrl = 'https://localhost:7120/Assessment/GetAssessmentTable/AssessmentTable';

  constructor(private http: HttpClient) {}

  getAssessments(): Observable<AssessmentTableDTO[]> {
    return this.http.get<AssessmentTableDTO[]>(this.trainerDashboardApiUrl);
  }
}
