import { Component } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { CardComponent } from '../card/card.component';
import { TableComponent } from '../table/table.component';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-assessment-performance',
  standalone: true,
  imports: [ButtonActiveComponent, CardComponent, TableComponent, SidebarComponent],
  templateUrl: './assessment-performance.component.html',
  styleUrl: './assessment-performance.component.scss'
})
export class AssessmentPerformanceComponent {
  name1:string='Total Trainees';
    name2:string='Trainees Attended';
    name3:string='Absentees';
    name4:string='Maximum Score';
    name5:string='Assessment Date';
    totalTrainees: string = '48';
    totalAttendees: string = '45';
    absentees: string = '3';
    assessmentName:string='OOP Assessment';
    maxScore:string='50';
    date:string='26/06/2024';
}
