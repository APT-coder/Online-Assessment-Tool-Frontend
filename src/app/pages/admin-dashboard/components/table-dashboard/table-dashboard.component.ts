import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AdminDashboardService } from '../../../../service/admin-dashboard/admin-dashboard.service';
import { Table, TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { AssessmentOverview } from '../../../../../models/assessmentOverview.interface';
import { CommonModule } from '@angular/common';
import { ButtonActiveComponent } from "../../../../ui/buttons/button-active/button-active.component";
import { RouterModule } from '@angular/router';
import { ButtonDashboardComponent } from "../../../../ui/buttons/button-dashboard/button-dashboard.component";

@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [TableModule, HttpClientModule, InputTextModule, TagModule, IconFieldModule, InputIconModule, CommonModule, ButtonActiveComponent, RouterModule, ButtonDashboardComponent],
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.scss']
})
export class TableDashboardComponent implements OnInit {
@Output() assessmentIdSelected = new EventEmitter<any>();
@ViewChild('dt1') dt1!: Table;
  assessments!: AssessmentOverview[];
  selectedAssessment!: AssessmentOverview;
  datePipeString: string = 'dd/MM/yyyy'; 
 


  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit() {
    this.adminDashboardService.getAllAssessmentOverviews().subscribe((response) => {
      if (response.isSuccess) {
        this.assessments = response.result;
      }
    });
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
