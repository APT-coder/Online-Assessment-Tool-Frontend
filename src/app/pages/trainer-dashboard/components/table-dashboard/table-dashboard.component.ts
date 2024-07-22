import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { faFilter, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrainerDashboardService } from '../../../../service/trainer-dashboard/trainer-dashboard.service';

interface AssessmentTableDTO {
  assessmentName: string;
  batchName: string;
  createdOn: string;
  scheduledDate: string;
  status: string;
}

@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, FontAwesomeModule],
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.scss']
})
export class TableDashboardComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faFilter = faFilter;
  filteredData: AssessmentTableDTO[] = [];
  selectedFilter: string = 'All';

  constructor(private dashboardService: TrainerDashboardService) {}

  ngOnInit() {
    this.fetchAssessments();
  }

  fetchAssessments() {
    this.dashboardService.getAssessments().subscribe((data: AssessmentTableDTO[]) => {
      this.filteredData = data;
    });
  }

  filterByStatus(status: string) {
    this.selectedFilter = status;
    if (status === 'All') {
      this.fetchAssessments();
    } else {
      this.dashboardService.getAssessments().subscribe((data: AssessmentTableDTO[]) => {
        this.filteredData = data.filter(item => item.status.toLowerCase() === status.toLowerCase());
      });
    }
  }
}
