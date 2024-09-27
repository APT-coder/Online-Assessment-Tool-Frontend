import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../shared/models/question.interface'; 
import { apiUrl } from '../../shared/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  assessmentApiUrl = `${apiUrl}/api/Assessment`;
  
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

  getAllAssessments(): Observable<any> {
    return this.http.get<any>(`${this.assessmentApiUrl}/GetAllAssessments`);
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
    return this.http.post(`${this.assessmentApiUrl}/AddQuestionToAssessment/${assessmentId}/questions`, transformedData);
  }
}
