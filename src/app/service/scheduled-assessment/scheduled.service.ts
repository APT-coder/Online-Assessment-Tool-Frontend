import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ScheduledResponse } from '../../shared/models/Schedule.interface'; 
import { CheckAttended } from '../../shared/models/checkAttende.interface';
import { CheckAttendedPostBody } from '../../shared/models/checkAttendedpostbody.interface';
import {Score} from '../../shared/models/Score.interface'
import { apiUrl } from '../../shared/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})

export class ScheduledService {

  constructor(private http:HttpClient) { }



  private apiUrl=`${apiUrl}/api/ScheduledAssessment/GetScheduledByUserId`;
  private checkAttendedUrl =`${apiUrl}/api/TraineeAnswer/CheckTraineeAnswerExists`;
  private assessentScore = `${apiUrl}/api/AssessmentScore/GetAssessmentScoresByTraineeId`;

 

  getScheduled(userId : number): Observable<any[]> {
    return this.http.get<ScheduledResponse>(`${this.apiUrl}/${userId}`).pipe(
      map(response => response.result)
    );;
  }

  checkAttended(userId:number , scheduledAssessmentId:number): Observable<CheckAttended> {
    const body: CheckAttendedPostBody = {
      scheduledAssessmentId: scheduledAssessmentId,
      userId: userId
    };
    return this.http.post<CheckAttended>(this.checkAttendedUrl, body);
  }

  getScores(userId : number): Observable<Score> {
    return this.http.get<Score>(`${this.assessentScore}/${userId}`);
  }


}



