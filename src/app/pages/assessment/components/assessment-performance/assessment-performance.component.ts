import { Component, OnInit } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { CardComponent } from '../card/card.component';
import { TableComponent } from '../table/table.component';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerformanceDetailsService } from '../../../../service/performance-details/performance-details.service';
import { PerformanceDetails } from '../../../../../models/performanceDetails.interface';

@Component({
  selector: 'app-assessment-performance',
  standalone: true,
  imports: [ButtonActiveComponent,
    CardComponent,
    TableComponent,
    SidebarComponent,
    CommonModule],
  templateUrl: './assessment-performance.component.html',
  styleUrl: './assessment-performance.component.scss'
})
export class AssessmentPerformanceComponent implements OnInit {
  maximumScore: string = '';
  totalTrainees: string = '';
  traineesAttended: string = '';
  absentees: string = '';
  assessmentDate: Date | null = null;
  name1: string = 'Total Trainees';
  name2: string = 'Attended';
  name3: string = 'Absentees';
  name4: string = 'Maximum Score';
  name5: string = 'Scheduled Date';
  scheduledAssessmentId!: number;

  constructor(private route: ActivatedRoute, private performanceService: PerformanceDetailsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('scheduledAssessmentId');
      this.scheduledAssessmentId = paramId ? +paramId : 0; 
      this.fetchPerformanceData(this.scheduledAssessmentId);
    });
  }

  fetchPerformanceData(scheduledAssessmentId: number) {
    this.performanceService.getPerformanceDetails(scheduledAssessmentId).subscribe((data: PerformanceDetails) => {
      this.maximumScore = data.maximumScore.toString();
      this.totalTrainees = data.totalTrainees.toString();
      this.traineesAttended = data.traineesAttended.toString();
      this.absentees = data.absentees.toString();
      this.assessmentDate = new Date(data.assessmentDate);
    });
  }

  getFormattedDate(date: Date | null): string {
    return date ? date.toLocaleDateString('en-GB') : ''; 
  }
}
