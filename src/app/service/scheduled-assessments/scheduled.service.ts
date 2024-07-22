

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ScheduledResponse } from '../../../models/Schedule.interface';

@Injectable({
  providedIn: 'root'
})

export class ScheduledService {

  constructor(private http:HttpClient) { }



  private apiUrl="http://localhost:5118/ScheduledAssessment/GetScheduled";

 

  getScheduled(userId : number): Observable<any[]> {
    return this.http.get<ScheduledResponse>(`${this.apiUrl}/${userId}`).pipe(
      map(response => response.result)
    );;
  }

}



