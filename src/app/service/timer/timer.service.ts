import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private intervalId: any;

  getTimer(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  startTimer(duration: string): void {
    this.stopTimer();
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    this.timerSubject.next(totalSeconds);

    this.intervalId = setInterval(() => {
      totalSeconds--;
      this.timerSubject.next(totalSeconds);

      if (totalSeconds <= 0) {
        this.stopTimer();
        // Timer finished logic here
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetTimer(): void {
    this.timerSubject.next(0);
  }
}


