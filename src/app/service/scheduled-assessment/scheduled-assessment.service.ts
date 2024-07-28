import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraineeAnswerDetailDTO } from '../../../models/TraineeAnswerDetailDTO.interface';
import { TraineeStatusDTO } from '../../../models/TraineeStatusDTO.interface';
import { UpdateScoreDTO } from '../../../models/UpdateScoreDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduledAssessmentService {

  scheduleAssessmentApiUrl = `https://localhost:7120/api/sScheduledAssessment`

  constructor(private http: HttpClient) {}

  scheduleAssessment(ScheduledAssessment: any): Observable<any> {
    return this.http.post<any>(`${this.scheduleAssessmentApiUrl}/PostScheduledAssessment`, ScheduledAssessment);
  }

  getAttendedStudents(scheduledAssessmentId: number): Observable<TraineeStatusDTO> {
    console.log("called");
    const data = this.http.get<TraineeStatusDTO>(`${this.scheduleAssessmentApiUrl}/GetAttendedStudents/attended-students/${scheduledAssessmentId}`);
    console.log(data);
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
    console.log(updateScoresDTO);
    return this.http.put('https://localhost:7120/api/TraineeAnswer/UpdateScore/updateScore', updateScoresDTO);
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
    return this.http.put('https://localhost:7120/api/AssessmentScore/UpdateAssessmentScores/update-assessment-scores', payload);
  }
}
