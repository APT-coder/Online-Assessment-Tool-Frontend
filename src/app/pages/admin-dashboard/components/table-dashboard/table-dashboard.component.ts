import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AdminDashboardService } from '../../../../service/admin-dashboard/admin-dashboard.service';
import { Table, TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { AssessmentOverview } from '../../../../shared/models/assessmentOverview.interface';
import { CommonModule } from '@angular/common';
import { ButtonActiveComponent } from "../../../../ui/buttons/button-active/button-active.component";
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonDashboardComponent } from "../../../../ui/buttons/button-dashboard/button-dashboard.component";

@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [TableModule, HttpClientModule, InputTextModule, TagModule, IconFieldModule, InputIconModule, CommonModule, ButtonActiveComponent,RouterModule, ButtonDashboardComponent, SkeletonModule],
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.scss']
})
export class TableDashboardComponent implements OnInit {
@Output() assessmentIdSelected = new EventEmitter<any>();
@ViewChild('dt1') dt1!: Table;
  assessments: AssessmentOverview[] = [];
  selectedAssessment!: AssessmentOverview;
  datePipeString: string = 'dd/MM/yyyy'; 
  skeletonData: Partial<AssessmentOverview>[] = [];
  rowsPerPage = 5;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit() {
    this.skeletonData = Array.from({ length: this.rowsPerPage }).map(() => ({
      assessmentName: '',
      date: undefined,
      trainer: '',
      batchName: '',
      status: ''
    }));
    this.fetchAssessments();
    // this.adminDashboardService.getAllAssessmentOverviews().subscribe((response) => {
    //   if (response.isSuccess) {
    //     this.assessments = response.result;
    //   }
    // });
  }

  fetchAssessments() {
    setTimeout(() => {
      this.adminDashboardService.getAllAssessmentOverviews().subscribe((response) => {
        if (response.isSuccess) {
          this.assessments = response.result;
        }
      });
    }, 2000);
  }

  filterGlobal(event: Event, field: string) {
    const inputElement = event.target as HTMLInputElement;
    const value = (inputElement?.value || '').toLowerCase(); 
    this.dt1.filterGlobal(value, 'contains'); 
}

onRowClick(scheduledAssessmentIdssessmentId: any) {
      console.log(scheduledAssessmentIdssessmentId);
      this.assessmentIdSelected.emit(scheduledAssessmentIdssessmentId);
  
} 
}
