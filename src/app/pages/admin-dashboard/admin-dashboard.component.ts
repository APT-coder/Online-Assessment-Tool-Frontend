import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { AdminDashboardService } from '../../service/admin-dashboard/admin-dashboard.service'; 
import { AssessmentOverview } from '../../../models/assessmentOverview.interface'; 
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from '../../components/profile-modal/profile-modal.component';
interface DropdownOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, ListTableComponent, PieDiagramComponent, DropdownComponent, TableDashboardComponent, ProfileCardComponent,CommonModule, ProfileModalComponent],
  templateUrl: './admin-dashboard.component.html',

  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent  implements OnInit {
  isSidebarCollapsed = false;
  selectedYear = '';
  selectedILP = '';
  selectedBatch = '';
  selectedAssessmentId: number | null = null;

  tableData: AssessmentOverview[] = [];
  yearOptions: DropdownOption[] = [];
  ilpOptions: DropdownOption[] = [];
  batchOptions: DropdownOption[] = [];

  isModalVisible = false;

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('overlay');
  }

  constructor(private assessmentService: AdminDashboardService) {}

  ngOnInit() {
    this.fetchAssessments();
  }

  populateDropdownOptions() {
    const years = new Set<string>();
    const ilps = new Set<string>();
    const batches = new Set<string>();

    this.tableData.forEach(assessment => {
      years.add(new Date(assessment.date).getFullYear().toString());
    });

    this.yearOptions = Array.from(years).map(year => ({ name: year, code: year }));
  }

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  onYearChange(year: DropdownOption) {
    this.selectedYear = year.code;
    this.filterData();
  }

  onILPChange(ilp: DropdownOption) {
    this.selectedILP = ilp.code;
    this.filterData();
  }

  onBatchChange(batch: DropdownOption) {
    this.selectedBatch = batch.code;
    this.filterData();
  }

  filterData() {
    this.tableData = this.tableData.filter(assessment =>
      (!this.selectedYear || new Date(assessment.date).getFullYear().toString() === this.selectedYear)
    );
  }

  
  fetchAssessments() {
    this.assessmentService.getAllAssessmentOverviews().subscribe(
      (data) => {
        if (data.isSuccess) {
          this.tableData = data.result;
          console.log(this.tableData);
          this.populateDropdownOptions();
          this.initializeMostRecentAssessment(); // Initialize with the most recent assessment
        } else {
          console.error('Failed to fetch assessments:', data.message);
        }
      },
      (error) => {
        console.error('Error fetching assessments', error);
      }
    );
  }

  initializeMostRecentAssessment() {
    if (this.tableData.length) {
      const mostRecentAssessment = this.tableData.reduce((latest, assessment) => 
        new Date(assessment.date) > new Date(latest.date) ? assessment : latest
      );
      this.selectedAssessmentId = mostRecentAssessment.assessmentId;
    }
  }

  onAssessmentSelected(assessmentId: number) {
    this.selectedAssessmentId = assessmentId;
    console.log('Selected Assessment ID:', assessmentId);
  }
}  
  

