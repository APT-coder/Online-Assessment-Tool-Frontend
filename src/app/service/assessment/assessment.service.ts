import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../shared/models/question.interface'; 

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  assessmentApiUrl = `https://localhost:7120/api/Assessment`;
  // https://localhost:7120/api/Assessment/UpdateAssessmentTotalScore/2

  
  constructor(private http: HttpClient) {}

  transformData(question: Question, createdBy: number): any {
    return {
      questionType: question.type,
      questionText: question.content,
      points: question.score,
      createdBy: createdBy,
      questionOptions: [
        {
          options: question.options,
          correctAnswers: question.correctAnswer
        }
      ]
    };
  }

  createAssessment(assessmentName: string | null, createdBy: number): Observable<any> {
    const payload = {
      assessmentName,
      createdBy
    };
    return this.http.post<any>(`${this.assessmentApiUrl}/CreateAssessment`, payload);
  }

  updateAssessment(assessmentId: number, totalScore: number): Observable<any> {
    const payload = {
      totalScore
    }
    return this.http.put<any>(`${this.assessmentApiUrl}/UpdateAssessmentTotalScore/${assessmentId}`, payload);
  }

  postQuestion(assessmentId: number, question: any, createdBy: number): Observable<any> {
    const transformedData = this.transformData(question, createdBy);
    console.log(transformedData);
    return this.http.post(`${this.assessmentApiUrl}/AddQuestionToAssessment/${assessmentId}/questions`, transformedData);
  }
}
