import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assessment, Question } from '../../../models/test.interface';


@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor(private http:HttpClient) { }


  private apiUrl="https://localhost:7200/api/Question";
  private assessmentUrl ="https://localhost:7120/Assessment/GetAssessment/2";
  private postAnswerUl = "  https://localhost:7120/TraineeAnswer/AssessmentSubmit/2";


  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }

  getAssessment(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.assessmentUrl);
  }
  postAssessment(assessment: any): Observable<any> {
    return this.http.post<any>(this.postAnswerUl, assessment);
  }

}