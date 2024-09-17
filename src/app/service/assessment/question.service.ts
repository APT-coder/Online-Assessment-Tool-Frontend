import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assessment, Question } from '../../shared/models/test.interface';


@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor(private http:HttpClient) { }

  private assessmentUrl ="https://localhost:7120/api/Assessment/GetAssessment";
  private postAnswerUrl = "  https://localhost:7120/api/TraineeAnswer/AssessmentSubmit";

  getAssessment(assessmentId:number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(`${this.assessmentUrl}/${assessmentId}`);
  }
  postAssessment(assessment: any, userId: number): Observable<any> {
    return this.http.post<any>(`${this.postAnswerUrl}/${userId}`, assessment);
  }

}