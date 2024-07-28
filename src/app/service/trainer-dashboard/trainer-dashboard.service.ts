import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AssessmentTableDTO {
  scheduledAssessmentId: number;
  assessmentName: string;
  batchName: string;
  createdOn: string;
  scheduledDate: string;
  status: string;
}

export interface TraineeAssessmentTableDTO {
  traineeName: string;
  IsPresent: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class TrainerDashboardService {
  private assessmentApiUrl = 'https://localhost:7120/api/Assessment';
  private assessmentScoreApiUrl = 'https://localhost:7120/api/AssessmentScore';

  constructor(private http: HttpClient) {}

  getAssessmentsForTrainer(trainerId: number): Observable<AssessmentTableDTO[]> {
    return this.http.get<AssessmentTableDTO[]>(`${this.assessmentApiUrl}/GetAssessmentTable/${trainerId}`);
  }

  getScoreDistribution(scheduledAssessmentId: number): Observable<any> {
    return this.http.get<any>(`${this.assessmentScoreApiUrl}/GetScoreDistribution/score-distribution/${scheduledAssessmentId}`);
  }

  getTraineeAssessmentDetails(scheduledAssessmentId: number): Observable<TraineeAssessmentTableDTO[]> {
    return this.http.get<TraineeAssessmentTableDTO[]>(`${this.assessmentApiUrl}/GetTraineeAssessmentDetails/GetTraineeAssessmentDetails/${scheduledAssessmentId}`);
  }
}
