import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { AdminDashboardService } from '../../service/admin-dashboard/admin-dashboard.service'; 
import { AssessmentOverview } from '../../shared/models/assessmentOverview.interface'; 
import { CommonModule } from '@angular/common';
import { DashboardTableComponent } from '../../components/dashboard-table/dashboard-table.component';
import { TabViewModule } from 'primeng/tabview';
import { adminAssessmentTable, traineeTable, status } from '../../shared/constants/dashboardTableCols';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TrainermanagementService } from '../../service/trainer-management/trainermanagement.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, ListTableComponent, 
    PieDiagramComponent, DashboardTableComponent, 
    CommonModule, TabViewModule,
    DropdownModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent  implements OnInit {
  adminTableData: AssessmentOverview[] = [];
  traineeTableData: any;
  adminTableCols: any;
  traineeTableCols: any;
  status: any;

  selectedAssessmentId!: number 
  defaultAssessmentId!: number 
  selectedAssessmentStatus!:string
  isDataAvailable: boolean = false;
  selectedYear: any;
  selectedBatch: any;
  years = [
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" }
  ];
  batches: any = [];
  allBatches: any = [];
  batchAverageScore: any;
  noDataMessage: string = 'Select the evaluated assessment to see the data';

  constructor(private assessmentService: AdminDashboardService, 
    private userService: TrainermanagementService) {}

  ngOnInit(): void {
    this.loadBatches();
    this.noDataMessage = 'Select the evaluated assessment to see the data';

    this.adminTableCols = adminAssessmentTable;
    this.traineeTableCols = traineeTable;
    this.status = status;
  }

  loadBatches(): void {
    this.userService.getBatches().subscribe(
      (      response: { isSuccess: any; result: any[]; }) => {
        if (response) {
          this.allBatches = response.result;
          this.initialiseDefaultBatch();
        }
      });
  }

  initialiseDefaultBatch() {
    this.selectedYear = this.years[0].label;
    const batchesForYear = this.getBatchesForYear(this.selectedYear);
    this.batches = batchesForYear;
    if (batchesForYear && batchesForYear.length > 0) {
        batchesForYear.sort((a, b) => {
            const dateA = new Date(a.createdOn).getTime();
            const dateB = new Date(b.createdOn).getTime();
            return dateB - dateA;
        });

        this.selectedBatch = batchesForYear[0].batchname;
    } else {
        this.selectedBatch = null;
    }
    this.fetchAssessments(this.selectedBatch);
    this.fetchTraineeAverageScore(this.selectedBatch);
  }

  fetchAssessments(batchName: string): void {
    this.assessmentService.getAllAssessmentOverviews().subscribe(
      (data) => {
        if (data && data.isSuccess) {
          this.adminTableData = data.result.filter(a => a.batchName === batchName);
          this.initializeMostRecentAssessment();
        } else {
          console.error('Failed to fetch assessments:', data?.message || 'Unknown error');
        }
      },
      (error) => {
        console.error('Error fetching assessments', error);
      }
    );
  }

  fetchTraineeAverageScore(batchName: string): void {
    this.assessmentService.getTraineeAverageScoreTable(batchName).subscribe(
      (data) => {
        if (data && data.isSuccess) {
          this.traineeTableData = data.result;
          this.batchAverageScore = this.traineeTableData[0].batchAverageScore;
        } else {
          console.error('Failed to fetch trainee data:', data?.message || 'Unknown error');
        }
      },
      (error) => {
        console.error('Error fetching trainee scores', error);
      }
    );
  }

  initializeMostRecentAssessment(): void {
    if (this.adminTableData.length) {
      const mostRecentAssessment = this.adminTableData.reduce((latest, assessment) =>
        new Date(assessment.date) > new Date(latest.date) ? assessment : latest
      );
      this.defaultAssessmentId = mostRecentAssessment.assessmentId;
      this.selectedAssessmentId = this.defaultAssessmentId; // Set default selection
    }
  }


  receiveAssessment(obj: any) {
    this.selectedAssessmentId =obj.assessmentId;
    this.selectedAssessmentStatus=obj.status;
    if (!obj.isEvaluated) {
      this.isDataAvailable = false;
      this.noDataMessage = 'No data available';
    } else {
      this.isDataAvailable = true;
    }
  }

  onAssessmentSelected(assessmentId: number): void {
    this.selectedAssessmentId = assessmentId;
  }

  onYearChange(event: any) {
    this.batches = this.getBatchesForYear(event.value);
  }

  onBatchChange(event: any) {
    this.fetchTraineeAverageScore(event.value);
  }

  getBatchesForYear(year: string): any[] {
    return this.allBatches.filter((batch: { createdOn: string | number | Date; }) => {
      const batchDate = new Date(batch.createdOn);
      const batchYear = batchDate.getFullYear().toString(); 
      return batchYear === year;
    });
  }
}  
  

