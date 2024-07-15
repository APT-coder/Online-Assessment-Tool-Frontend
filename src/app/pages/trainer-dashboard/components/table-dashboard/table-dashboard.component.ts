import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { faFilter, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


interface AssessmentDetails {
  status: string;
  dateTime: string;
}

interface Assessment {
  testName: string;
  batch: string;
  createdOn: string;
  totalStudents: number;
  studentsPassed: number | null;
  studentsFailed: number | null;
  studentsAbsent: number | null;
  details: AssessmentDetails;
}

@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [CommonModule,TableModule,
    ButtonModule,FontAwesomeModule],
  templateUrl: './table-dashboard.component.html',
  styleUrl: './table-dashboard.component.scss'
})
export class TableDashboardComponent {
  faPen = faPen;
  faTrash = faTrash;
  faFilter = faFilter;
  tableData: {
    assessments: Assessment[];
  } = {
    "assessments": [
      {
        "testName": "OOPs Concepts",
        "batch": "Batch 1",
        "createdOn": "2024-07-09",
        "totalStudents": 30,
        "studentsPassed": 20,
        "studentsFailed": 8,
        "studentsAbsent": 2,
        "details": {
          "status": "completed",
          "dateTime": "2024-07-15T10:00:00Z"
        }
      },
      {
        "testName": "HTML Fundamentals",
        "batch": "Batch 2",
        "createdOn": "2024-07-10",
        "totalStudents": 25,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "upcoming",
          "dateTime": "2024-08-01T10:00:00Z"
        }
      },
      {
        "testName": "CSS Basics",
        "batch": "Batch 3",
        "createdOn": "2024-07-11",
        "totalStudents": 20,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "cancelled",
          "dateTime": "2024-09-01T10:00:00Z"
        }
      },
      {
        "testName": "Soft Skills Training",
        "batch": "Batch 1",
        "createdOn": "2024-07-12",
        "totalStudents": 35,
        "studentsPassed": 25,
        "studentsFailed": 5,
        "studentsAbsent": 5,
        "details": {
          "status": "completed",
          "dateTime": "2024-07-20T10:00:00Z"
        }
      },
      {
        "testName": "JavaScript Essentials",
        "batch": "Batch 2",
        "createdOn": "2024-07-13",
        "totalStudents": 28,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "upcoming",
          "dateTime": "2024-08-10T10:00:00Z"
        }
      },
      {
        "testName": "Database Management",
        "batch": "Batch 3",
        "createdOn": "2024-07-14",
        "totalStudents": 22,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "cancelled",
          "dateTime": "2024-09-15T10:00:00Z"
        }
      },
      {
        "testName": "Angular Framework",
        "batch": "Batch 1",
        "createdOn": "2024-07-15",
        "totalStudents": 32,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "upcoming",
          "dateTime": "2024-08-05T10:00:00Z"
        }
      },
      {
        "testName": "Python Programming",
        "batch": "Batch 2",
        "createdOn": "2024-07-16",
        "totalStudents": 26,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "cancelled",
          "dateTime": "2024-09-20T10:00:00Z"
        }
      },
      {
        "testName": "Machine Learning Basics",
        "batch": "Batch 3",
        "createdOn": "2024-07-17",
        "totalStudents": 30,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "completed",
          "dateTime": "2024-07-25T10:00:00Z"
        }
      },
      {
        "testName": "Network Security",
        "batch": "Batch 1",
        "createdOn": "2024-07-18",
        "totalStudents": 27,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": null,
        "details": {
          "status": "upcoming",
          "dateTime": "2024-08-15T10:00:00Z"
        }
      },
      {
        "testName": "DevOps Practices",
        "batch": "Batch 2",
        "createdOn": "2024-07-09",
        "totalStudents": 30,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": 5,
        "details": {
          "status": "running",
          "dateTime": "2024-07-09T12:00:00Z"
        }
      }
    ]
  }
  filteredData: Assessment[] = [];

  constructor() {
    this.filteredData = this.tableData.assessments;
  }

  selectedFilter: string = 'All';

  filterByStatus(status: string) {
    this.selectedFilter=status;
    if (status === 'All') {
      this.filteredData = this.tableData.assessments;
    } else {
      this.filteredData = this.tableData.assessments.filter(item => item.details.status.toLowerCase() === status.toLowerCase());
    }
  }
  
}
