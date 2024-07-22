import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ScheduledService } from '../../../../service/scheduled-assessments/scheduled.service';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [MatTableModule,CommonModule],
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
