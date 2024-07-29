  import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
  import { HttpClientModule } from '@angular/common/http';
  import { Table, TableModule } from 'primeng/table';
  import { InputTextModule } from 'primeng/inputtext';
  import { IconFieldModule } from 'primeng/iconfield';
  import { InputIconModule } from 'primeng/inputicon';
  import { TagModule } from 'primeng/tag';
  import { RouterModule } from '@angular/router';
  import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  import { faFilter, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { TrainerDashboardService } from '../../../../service/trainer-dashboard/trainer-dashboard.service';
  import { ButtonActiveComponent } from "../../../../ui/buttons/button-active/button-active.component";
  import { CommonModule } from '@angular/common';
import { ButtonDashboardComponent } from "../../../../ui/buttons/button-dashboard/button-dashboard.component";

  interface AssessmentTableDTO {
    scheduledAssessmentId: number;
    assessmentName: string;
    batchName: string;
    createdOn: string;
    scheduledDate: string;
    status: string;
  }

  @Component({
    selector: 'app-table-dashboard',
    standalone: true,
    imports: [TableModule, HttpClientModule, InputTextModule, TagModule, IconFieldModule, InputIconModule, RouterModule, FontAwesomeModule, ButtonActiveComponent, CommonModule, ButtonDashboardComponent],
    templateUrl: './table-dashboard.component.html',
    styleUrls: ['./table-dashboard.component.scss']
  })
  export class TableDashboardComponent implements OnInit {
    @ViewChild('dt1') dt1!: Table;
    @Output() assessmentSelected = new EventEmitter<any>();
    faPen = faPen;
    faTrash = faTrash;
    faFilter = faFilter;
    filteredData: AssessmentTableDTO[] = [];
    selectedFilter: string = 'All';
    selectedAssessment!: AssessmentTableDTO;

    constructor(private dashboardService: TrainerDashboardService) {}

    ngOnInit() {
      this.fetchAssessments();
    }

    fetchAssessments() {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const trainerId = userDetails.TrainerId;
      this.dashboardService.getAssessmentsForTrainer(trainerId).subscribe((data: AssessmentTableDTO[]) => {
        this.filteredData = data;
        console.log(this.filteredData);
      });
    }

    filterByStatus(status: string) {
      this.selectedFilter = status;
      if (status === 'All') {
        this.fetchAssessments();
      } else {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        const trainerId = userDetails.TrainerId;
        this.dashboardService.getAssessmentsForTrainer(trainerId).subscribe((data: AssessmentTableDTO[]) => {
          this.filteredData = data.filter(item => item.status.toLowerCase() === status.toLowerCase());
        });
      }
    }

    onRowClick(scheduledAssessmentId: any) {
      console.log(scheduledAssessmentId);
      this.assessmentSelected.emit(scheduledAssessmentId);
      
    }

    getSeverity(status: string) {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'success';
        case 'upcoming':
          return 'info';
        case 'cancelled':
          return 'danger';
        default:
          return null;
      }
    }

    filterGlobal(event: Event, field: string) {
      const inputElement = event.target as HTMLInputElement;
      const value = (inputElement?.value || '').toLowerCase();
      this.dt1.filterGlobal(value, 'contains');
    }


    
  }
