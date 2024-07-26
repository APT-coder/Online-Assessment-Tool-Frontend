import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { AdminDashboardService } from '../../service/admin-dashboard/admin-dashboard.service'; 
import { AssessmentOverview } from '../../../models/assessmentOverview.interface'; 
import { CommonModule } from '@angular/common';
import { TrainerTableComponent } from "./components/trainer-table/trainer-table.component";
interface DropdownOption {
  name: string;
  code: string;
}

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

  constructor(private assessmentService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchAssessments();
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


  receiveAssessmentId(assessmentId: number) {
    this.selectedAssessmentId = assessmentId;
    console.log(assessmentId);
  }

  onAssessmentSelected(assessmentId: number): void {
    this.selectedAssessmentId = assessmentId;
    console.log('Selected Assessment ID:', this.selectedAssessmentId);
  }
}  
  

