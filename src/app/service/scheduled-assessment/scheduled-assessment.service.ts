import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraineeAnswerDetailDTO } from '../../shared/models/TraineeAnswerDetailDTO.interface';
import { TraineeStatusDTO } from '../../shared/models/TraineeStatusDTO.interface';
import { UpdateScoreDTO } from '../../shared/models/UpdateScoreDTO.interface';
import { AssessmentStatus, AssessmentTableDTO } from '../../shared/models/AssessmentTableDTO.interface';
import { apiUrl } from '../../shared/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ScheduledAssessmentService {

  scheduleAssessmentApiUrl = `${apiUrl}/api/ScheduledAssessment`

  constructor(private http: HttpClient) {}

  scheduleAssessment(ScheduledAssessment: any): Observable<any> {
    return this.http.post<any>(`${this.scheduleAssessmentApiUrl}/PostScheduledAssessment`, ScheduledAssessment);
  }

  getAttendedStudents(scheduledAssessmentId: number): Observable<TraineeStatusDTO> {
    const data = this.http.get<TraineeStatusDTO>(`${this.scheduleAssessmentApiUrl}/GetAttendedStudents/attended-students/${scheduledAssessmentId}`);
    return data;
  }
  
  getAbsentStudents(scheduledAssessmentId: number): Observable<TraineeStatusDTO> {
    return this.http.get<TraineeStatusDTO>(`${this.scheduleAssessmentApiUrl}/GetAbsentStudents/absent-students/${scheduledAssessmentId}`);
  }
  
  getTraineeAnswerDetails(traineeId: number, scheduledAssessmentId: number): Observable<TraineeAnswerDetailDTO> {
    return this.http.get<TraineeAnswerDetailDTO>(`${this.scheduleAssessmentApiUrl}/GetTraineeAnswerDetails/trainee/${traineeId}/scheduledAssessment/${scheduledAssessmentId}`);
  }

  getStudentCountByAssessment(assessmentId: number): Observable<number> {
    return this.http.get<number>(`${this.scheduleAssessmentApiUrl}/GetStudentCountByAssessment/studentcount?assessmentId=${assessmentId}`);
  }
  
  updateScores(updateScoresDTO: UpdateScoreDTO): Observable<any> {
    return this.http.put(`${apiUrl}/api/TraineeAnswer/UpdateScore/updateScore`, updateScoresDTO);
  }

  updateTotalScores(newScore: number, traineeId: number, assessmentId: number): Observable<any> {
    const payload = {
      "assessmentScores": [
        {
          "scheduledAssessmentId": assessmentId,
          "traineeId": traineeId,
          "avergeScore": newScore,
          "calculatedOn": new Date().toISOString()
        }
      ]    
    }
    return this.http.put(`${apiUrl}/api/AssessmentScore/UpdateAssessmentScores/update-assessment-scores`, payload);
  }

  fetchAssessmentName(scheduledAssessmentId:number): Observable<AssessmentTableDTO> {
    return this.http.get<AssessmentTableDTO>(`${this.scheduleAssessmentApiUrl}/GetAssessmentTableByScheduledAssessmentId/AssessmentTable/${scheduledAssessmentId}`);
  }

  updateScheduledAssessmentStatus(scheduledAssessmentId: number, status: AssessmentStatus): Observable<any> {
    const payload = {
      Status: status
    };
    return this.http.put(`${this.scheduleAssessmentApiUrl}/UpdateScheduledAssessmentStatus/update-status/${scheduledAssessmentId}`, payload);
  }
}
