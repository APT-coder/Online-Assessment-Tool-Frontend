import { Component } from '@angular/core';
import { LiveCardComponent } from './components/live-card/live-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { CommonModule } from '@angular/common';
import { BarGraphComponent } from "./components/bar-graph/bar-graph/bar-graph.component";
import { TabViewModule } from 'primeng/tabview';
import { TrainerDashboardService } from '../../service/trainer-dashboard/trainer-dashboard.service';
import { trainerAssessmentTable, status, trainerAssessmentTableFiltered } from '../../shared/constants/dashboardTableCols';
import { DashboardTableComponent } from '../../components/dashboard-table/dashboard-table.component';
import { DropdownModule } from 'primeng/dropdown';
import { TrainermanagementService } from '../../service/trainer-management/trainermanagement.service';
import { FormsModule } from '@angular/forms';

interface AssessmentTableDTO {
  scheduledAssessmentId: number;
  assessmentName: string;
  batchName: string;
  createdOn: string;
  scheduledDate: string;
  status: string;
}

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [LiveCardComponent, SidebarComponent, PieDiagramComponent, 
    CommonModule, BarGraphComponent, TabViewModule, DashboardTableComponent,
    DropdownModule, FormsModule],
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.scss'
})
export class TrainerDashboardComponent {
  isModalVisible = false;
  selectedAssessmentId!: number;
  selectedAssessmentStatus!:string;
  isDataAvailable: boolean = false;
  noDataMessage: string = 'Select the evaluated assessment to see the data';

  assessmentTableData: AssessmentTableDTO[] = [];
  filteredAssessmentData: AssessmentTableDTO[] = [];
  assessmentTableCols: any;
  filteredTableCols: any;
  status: any;
  selectedFilter: string = '';

  selectedYear: any;
  selectedBatch: any;
  years = [
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" }
  ];
  batches: any = [];
  allBatches: any = [];

  constructor(private dashboardService: TrainerDashboardService,
    private userService: TrainermanagementService
  ) {}

  ngOnInit() {
    this.loadBatches();
    this.assessmentTableCols = trainerAssessmentTable;
    this.filteredTableCols = trainerAssessmentTableFiltered;
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
  }

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('overlay');
  }

  fetchAssessments(batchName: string) {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const trainerId = userDetails.TrainerId;
    setTimeout(() => {
      this.dashboardService.getAssessmentsForTrainer(trainerId).subscribe((data: AssessmentTableDTO[]) => {
        this.assessmentTableData = data.filter(a => a.batchName === batchName);
      });
    }, 1000);
  }

  onAssessmentSelected(Obj: any) {
    this.selectedAssessmentId = Obj.scheduledAssessmentId;
    this.selectedAssessmentStatus = Obj.status;
    if (!Obj.isEvaluated) {
      this.isDataAvailable = false;
      this.noDataMessage = 'No data available';
    } else {
      this.isDataAvailable = true;
    }
  }

  filterByStatus(status: string) {
    this.selectedFilter = status;
    if (status === 'All') {
      this.filteredAssessmentData = this.assessmentTableData;
    } else {
      this.filteredAssessmentData = this.assessmentTableData.filter(
        (item) => item.status.toLowerCase() === status.toLowerCase()
      );
    }
  }

  onTabChange(event: any) {
    const tabIndex = event.index;
    let statusFilter = 'All';
    if (tabIndex === 1) statusFilter = 'Upcoming';
    else if (tabIndex === 2) statusFilter = 'Completed';
    else if (tabIndex === 3) statusFilter = 'Evaluated';
    
    this.selectedAssessmentStatus = '';
    this.filterByStatus(statusFilter);
  }

  onYearChange(event: any) {
    this.batches = this.getBatchesForYear(event.value);
  }

  onBatchChange(event: any) {
    this.fetchAssessments(event.value);
  }

  getBatchesForYear(year: string): any[] {
    return this.allBatches.filter((batch: { createdOn: string | number | Date; }) => {
      const batchDate = new Date(batch.createdOn);
      const batchYear = batchDate.getFullYear().toString(); 
      return batchYear === year;
    });
  }
}

