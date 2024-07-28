import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduled',
  standalone: true
})
export class ScheduledPipe implements PipeTransform {

  transform(assessments: any[], currentDate: Date = new Date()): any[] {
    return assessments.filter(assessment => {
      const scheduledDate = new Date(assessment.scheduledDate);
      return scheduledDate >= currentDate;
    });
  }
}
