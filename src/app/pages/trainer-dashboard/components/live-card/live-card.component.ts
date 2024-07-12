import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';


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
  selector: 'app-live-card',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './live-card.component.html',
  styleUrl: './live-card.component.scss'
})
export class LiveCardComponent implements OnInit {
  runningTest: Assessment | undefined;
 
  assessments = {
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
        "testName": "DevOps",
        "batch": "Batch 2",
        "createdOn": "2024-07-09",
        "totalStudents": 30,
        "studentsPassed": null,
        "studentsFailed": null,
        "studentsAbsent": 5,
        "details": {
          "status": "running",
          "dateTime": "2024-07-09T12:05:00Z"
        }
      }
    ]
  };
  constructor() {}

  ngOnInit(): void {
    
    const assessmentsArray = this.assessments.assessments;
    for (let i = 0; i < assessmentsArray.length; i++) {
      if (assessmentsArray[i].details.status === 'running') {
        this.runningTest = assessmentsArray[i];
        break;
      }
    }
  }
}

