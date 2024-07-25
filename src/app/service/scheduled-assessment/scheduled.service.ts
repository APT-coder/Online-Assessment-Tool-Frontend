

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ScheduledResponse } from '../../../models/Schedule.interface'; 

@Injectable({
  providedIn: 'root'
})

export class ScheduledService {

  constructor(private http:HttpClient) { }



  private apiUrl="https://localhost:7120/ScheduledAssessment/GetScheduledByUserId";
  

 

  getScheduled(userId : number): Observable<any[]> {
    return this.http.get<ScheduledResponse>(`${this.apiUrl}/${userId}`).pipe(
      map(response => response.result)
    );;
  }

}



