import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { ProfileModalComponent } from '../../components/profile-modal/profile-modal.component';
import { CommonModule } from '@angular/common';
interface DropdownOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, ListTableComponent, PieDiagramComponent, DropdownComponent, TableDashboardComponent, ProfileCardComponent, ProfileModalComponent, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  isSidebarCollapsed: boolean = false;
    selectedYear: string = '';
    selectedILP: string = '';
    selectedBatch: string = '';

    isModalVisible = false;

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('overlay');
  }

    tableData = [
      {
        batch: 'Batch 1',
        year: '2023-24',
        category: 'ILP',
        totalLearners: 30,
        assessments: [
          {
            assessmentName: 'OOPS',
            trainerName: 'John Doe',
            assessmentDate: '2024-01-15',
            
            maximumScore: 100,
            highestScore: 95,
            lowestScore: 60
          },
          {
            assessmentName: 'Python',
            trainerName: 'Jane Smith',
            assessmentDate: '2024-02-20',
          
            maximumScore: 100,
            highestScore: 90,
            lowestScore: 50
          },
          {
            assessmentName: 'Java',
            trainerName: 'Alice Johnson',
            assessmentDate: '2024-03-10',
            
            maximumScore: 100,
            highestScore: 85,
            lowestScore: 55
          },
          {
            assessmentName: 'DevOps',
            trainerName: 'Bob Brown',
            assessmentDate: '2024-04-05',
           
            maximumScore: 100,
            highestScore: 92,
            lowestScore: 70
          }
        ]
      },
      {
        batch: 'Batch 2',
        year: '2022-23',
        category: 'ILP',
        totalLearners: 25,
        assessments: [
          {
            assessmentName: 'DBMS',
            trainerName: 'Carol White',
            assessmentDate: '2023-11-15',
           
            maximumScore: 100,
            highestScore: 85,
            lowestScore: 45
          },
          {
            assessmentName: 'Scrum',
            trainerName: 'David Green',
            assessmentDate: '2023-12-20',
           
            maximumScore: 100,
            highestScore: 80,
            lowestScore: 40
          },
          {
            assessmentName: 'Soft Skills',
            trainerName: 'Eve Black',
            assessmentDate: '2024-01-10',
           
            maximumScore: 100,
            highestScore: 90,
            lowestScore: 50
          },
          {
            assessmentName: 'OOPS',
            trainerName: 'John Doe',
            assessmentDate: '2024-02-05',
           
            maximumScore: 100,
            highestScore: 95,
            lowestScore: 60
          }
        ]
      },
      {
        batch: 'Batch 3',
        year: '2021-22',
        category: 'ILP',
        totalLearners: 20,
        assessments: [
          {
            assessmentName: 'Python',
            trainerName: 'Jane Smith',
            assessmentDate: '2022-10-20',
           
            maximumScore: 100,
            highestScore: 90,
            lowestScore: 50
          },
          {
            assessmentName: 'Java',
            trainerName: 'Alice Johnson',
            assessmentDate: '2022-11-05',
          
            maximumScore: 100,
            highestScore: 88,
            lowestScore: 55
          },
          {
            assessmentName: 'DevOps',
            trainerName: 'Bob Brown',
            assessmentDate: '2022-11-25',
           
            maximumScore: 100,
            highestScore: 92,
            lowestScore: 70
          },
          {
            assessmentName: 'DBMS',
            trainerName: 'Carol White',
            assessmentDate: '2022-12-10',
          
            maximumScore: 100,
            highestScore: 85,
            lowestScore: 45
          }
        ]
      },
      {
        batch: 'Batch 4',
        year: '2020-21',
        category: 'ILP',
        totalLearners: 15,
        assessments: [
          {
            assessmentName: 'Scrum',
            trainerName: 'David Green',
            assessmentDate: '2021-09-15',
            
            maximumScore: 100,
            highestScore: 80,
            lowestScore: 40
          },
          {
            assessmentName: 'Soft Skills',
            trainerName: 'Eve Black',
            assessmentDate: '2021-10-10',
           
            maximumScore: 100,
            highestScore: 90,
            lowestScore: 50
          },
          {
            assessmentName: 'OOPS',
            trainerName: 'John Doe',
            assessmentDate: '2021-11-05',
           
            maximumScore: 100,
            highestScore: 95,
            lowestScore: 60
          },
          {
            assessmentName: 'Python',
            trainerName: 'Jane Smith',
            assessmentDate: '2021-12-20',
        
            maximumScore: 100,
            highestScore: 90,
            lowestScore: 50
          }
        ]
      }
    ];
  
  
    filteredData = this.tableData;

  yearOptions: DropdownOption[] = [];
  ilpOptions: DropdownOption[] = [];
  batchOptions: DropdownOption[] = [];

  ngOnInit() {
    this.populateDropdownOptions();
  }

  populateDropdownOptions() {
    const years = new Set<string>();
    const ilps = new Set<string>();
    const batches = new Set<string>();

    this.tableData.forEach(data => {
      years.add(data.year);
      ilps.add(data.category);
      batches.add(data.batch);
    });

    this.yearOptions = Array.from(years).map(year => ({ name: year, code: year }));
    this.ilpOptions = Array.from(ilps).map(ilp => ({ name: ilp, code: ilp }));
    this.batchOptions = Array.from(batches).map(batch => ({ name: batch, code: batch }));
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
    this.filteredData = this.tableData.filter(data =>
      (this.selectedYear ? data.year === this.selectedYear : true) &&
      (this.selectedILP ? data.category === this.selectedILP : true) &&
      (this.selectedBatch ? data.batch === this.selectedBatch : true)
    );
  }
}
