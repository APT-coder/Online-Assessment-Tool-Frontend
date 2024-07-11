import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor(private http:HttpClient) { }


  private apiUrl="https://localhost:7200/api/Question";
  getJSON(): Observable<any> {
    return this.http.get("data.json");
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }
}