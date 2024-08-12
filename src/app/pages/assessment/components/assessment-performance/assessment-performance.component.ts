import { Component, OnInit } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { CardComponent } from '../card/card.component';
import { TableComponent } from '../table/table.component';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerformanceDetailsService } from '../../../../service/performance-details/performance-details.service';
import { PerformanceDetails } from '../../../../../models/performanceDetails.interface';
import * as XLSX from 'xlsx';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';


interface Trainee {
  traineeName: string;
  isPresent: string;
  score: number;
}

@Component({
  selector: 'app-assessment-performance',
  standalone: true,
  imports: [ButtonActiveComponent,
    CardComponent,
    TableComponent,
    SidebarComponent,
    CommonModule,
    ProgressBarModule,DialogModule, ButtonModule,
    TableModule,CheckboxModule],
  templateUrl: './assessment-performance.component.html',
  styleUrl: './assessment-performance.component.scss'
})
export class AssessmentPerformanceComponent implements OnInit {
  name1: string = 'Total Trainees';
  name2: string = 'Attended';
  name3: string = 'Absentees';
  name4: string = 'Maximum Score';
  name5: string = 'Scheduled Date';
  scheduledAssessmentId!: number;

  trainees!: Trainee[];
  originalProducts!: Trainee[];
  selectedTrainees!: Trainee;

  performanceData!: {maximumScore: string, totalTrainees: string, traineesAttended: string, absentees: string, assessmentDate: Date, assessmentName: string, batchName: string};

  isLoading: boolean = true; // Loading state
  visible: boolean = false;

  constructor(private route: ActivatedRoute, private performanceService: PerformanceDetailsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('scheduledAssessmentId');
      this.scheduledAssessmentId = paramId ? +paramId : 0; 
      this.fetchPerformanceData(this.scheduledAssessmentId);
      this.fetchTraineesData(this.scheduledAssessmentId);
    });
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.trainees = this.originalProducts.filter(trainee =>
        trainee.traineeName.toLowerCase().includes(searchTerm)
      );
    } else {
      this.trainees = [...this.originalProducts];
    }
  }

  fetchPerformanceData(scheduledAssessmentId: number) {
    this.performanceService.getPerformanceDetails(scheduledAssessmentId).subscribe((data: PerformanceDetails) => {
      this.performanceData = {
        maximumScore: data.maximumScore.toString(),
        totalTrainees: data.totalTrainees.toString(),
        traineesAttended: data.traineesAttended.toString(),
        absentees: data.absentees.toString(),
        assessmentDate: new Date(data.assessmentDate),
        assessmentName: data.assessmentName.toString(),
        batchName: data.batchName.toString()
      };
      this.isLoading = false; // Data is loaded, stop loading
      console.log('Performance Data JSON:', this.performanceData);
    });
  }

  fetchTraineesData(assessmentId:number) {
    this.performanceService.getTrainees(assessmentId).subscribe(
      (data: Trainee[]) => {
        this.trainees = data;
        this.originalProducts = [...this.trainees];
        console.log(this.originalProducts);
      },
      error => {
        console.error('Error fetching trainees data', error);
        this.isLoading = false; // Even if there's an error, stop loading
      }
    );
  }

  getFormattedDate(date: Date | null): string {
    return date ? date.toLocaleDateString('en-GB') : ''; 
  }

  exportToExcel() {
    const workbook = XLSX.utils.book_new();

    const performanceRow = [
      ['Assessment Name', this.performanceData.assessmentName],
      ['Batch Name', this.performanceData.batchName],
      ['Scheduled Date', this.getFormattedDate(this.performanceData.assessmentDate)],
      ['Maximum Score', this.performanceData.maximumScore],
      ['Total Trainees', this.performanceData.totalTrainees],
      ['Trainees Attended', this.performanceData.traineesAttended],
      ['Absentees', this.performanceData.absentees],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(performanceRow);
    XLSX.utils.sheet_add_aoa(worksheet, [[]], { origin: -1 });
    XLSX.utils.sheet_add_json(worksheet, this.originalProducts, { origin: 'A10', skipHeader: false });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Performance Data');
    XLSX.writeFile(workbook, 'assessment_performance.xlsx');
  }

  showDialog() {
    this.visible = true;  
}
sendMail(){
console.log(this.selectedTrainees)
}
}
