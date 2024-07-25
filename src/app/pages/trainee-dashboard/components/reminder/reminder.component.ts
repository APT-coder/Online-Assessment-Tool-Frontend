import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ScheduledService } from '../../../../service/scheduled-assessment/scheduled.service'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterLink],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss'
})
export class ReminderComponent {

  @Input() assessments: any;

  onRowClick(assessment: ScheduledService): void {
    // Handle the click event here
    console.log('Row clicked:', assessment);
    // You can navigate to a detail page, open a modal, etc.
  }

}
