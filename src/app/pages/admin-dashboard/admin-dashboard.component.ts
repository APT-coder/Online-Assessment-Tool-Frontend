import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { AdminDashboardService } from '../../service/admin-dashboard/admin-dashboard.service'; 
import { AssessmentOverview } from '../../shared/models/assessmentOverview.interface'; 
import { CommonModule } from '@angular/common';
import { TrainerTableComponent } from "./components/trainer-table/trainer-table.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, ListTableComponent, PieDiagramComponent, TableDashboardComponent, CommonModule, TrainerTableComponent],
  templateUrl: './admin-dashboard.component.html',

  styleUrl: './admin-dashboard.component.scss'
})

export class AdminDashboardComponent  implements OnInit {
  tableData: AssessmentOverview[] = [];
  selectedAssessmentId!: number 
  defaultAssessmentId!: number 
  selectedAssessmentStatus!:string
  isDataAvailable: boolean = false;
  noDataMessage: string = 'Select the evaluated assessment to see the data';

  constructor(private assessmentService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchAssessments();
    this.noDataMessage = 'Select the evaluated assessment to see the data';
  }

  fetchAssessments(): void {
    this.assessmentService.getAllAssessmentOverviews().subscribe(
      (data) => {
        if (data && data.isSuccess) {
          this.tableData = data.result;
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

  initializeMostRecentAssessment(): void {
    if (this.tableData.length) {
      const mostRecentAssessment = this.tableData.reduce((latest, assessment) =>
        new Date(assessment.date) > new Date(latest.date) ? assessment : latest
      );
      this.defaultAssessmentId = mostRecentAssessment.assessmentId;
      this.selectedAssessmentId = this.defaultAssessmentId; // Set default selection
      console.log('Initialized Most Recent Assessment ID:', this.defaultAssessmentId);
    }
  }


  receiveAssessment(obj: any) {
    this.selectedAssessmentId =obj.assessmentId;
    console.log(obj.assessmentId);
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
    console.log('Selected Assessment ID:', this.selectedAssessmentId);
  }
}  
  

