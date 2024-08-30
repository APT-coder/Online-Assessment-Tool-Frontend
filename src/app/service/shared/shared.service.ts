import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private isScheduledSubject = new BehaviorSubject<boolean>(true);
  isScheduled$ = this.isScheduledSubject.asObservable();

  setIsScheduled(value: boolean): void {
    this.isScheduledSubject.next(value);
  }
}
