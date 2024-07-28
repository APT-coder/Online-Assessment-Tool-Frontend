import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../../models/question.interface'; 

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  assessmentApiUrl = `https://localhost:7120/api/Assessment`;
  
  constructor(private http: HttpClient) {}

  transformData(question: Question, createdBy: number): any {
    return {
      questionType: question.type,
      questionText: question.content,
      points: question.score,
      createdBy: createdBy,
      questionOptions: [
        {
          option1: question.options[0] || '',
          option2: question.options[1] || '',
          option3: question.options[2] || '',
          option4: question.options[3] || '',
          correctAnswer: question.correctAnswer
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

  postQuestion(assessmentId: number, question: any, createdBy: number): Observable<any> {
    const transformedData = this.transformData(question, createdBy);
    return this.http.post(`${this.assessmentApiUrl}/AddQuestionToAssessment/${assessmentId}/questions`, transformedData);
  }
}
