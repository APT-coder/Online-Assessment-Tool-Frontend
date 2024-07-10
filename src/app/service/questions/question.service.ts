import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor(private http:HttpClient) { }

  getJSON(): Observable<any> {
    return this.http.get("data.json");
    
  }
}