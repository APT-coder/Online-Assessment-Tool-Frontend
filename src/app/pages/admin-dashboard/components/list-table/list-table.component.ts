import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss'
})
export class ListTableComponent implements OnInit{

  @Input() batchName: string = '';
  Title:string='';
  @Input() assessmentName: string = '';
  @Input() performerType: 'top' | 'low' = 'top';
  tableData: any = {
    batches: [
      {
        "batchName": "Batch1",
        "totalStudents": 10,
        "assessments": [
          {
            "assessmentName": "OOPS",
            "trainees": [
              { "name": "John Doe", "score": 85 },
              { "name": "Jane Smith", "score": 90 },
              { "name": "Michael Johnson", "score": 78 },
              { "name": "Emily Davis", "score": 82 },
              { "name": "David Wilson", "score": 79 },
              { "name": "Linda Martinez", "score": 88 },
              { "name": "James Brown", "score": 92 },
              { "name": "Patricia Taylor", "score": 81 },
              { "name": "Robert Harris", "score": 76 },
              { "name": "Barbara Clark", "score": 84 }
            ]
          },
          {
            "assessmentName": "Python",
            "trainees": [
              { "name": "John Doe", "score": 88 },
              { "name": "Jane Smith", "score": 95 },
              { "name": "Michael Johnson", "score": 80 },
              { "name": "Emily Davis", "score": 85 },
              { "name": "David Wilson", "score": 77 },
              { "name": "Linda Martinez", "score": 90 },
              { "name": "James Brown", "score": 89 },
              { "name": "Patricia Taylor", "score": 83 },
              { "name": "Robert Harris", "score": 78 },
              { "name": "Barbara Clark", "score": 87 }
            ]
          }
        ]
      }
    ]
  };
  filteredData: any[] = [];
  lowPerformersData: any[] = []; 

  ngOnInit(): void {
    if (this.performerType === 'top') {
      this.Title="Top Performers";
      this.getTopPerformers(this.batchName, this.assessmentName);
    } else {
      this.Title="Low Performers";
      this.getLowPerformers(this.batchName, this.assessmentName);
    }
  }

  getTopPerformers(batchName: string, assessmentName: string): void {
    const batch = this.tableData.batches.find((batch: any) => batch.batchName === batchName);
    if (batch) {
      const assessment = batch.assessments.find((assessment: any) => assessment.assessmentName === assessmentName);
      if (assessment) {
        this.filteredData = assessment.trainees
          .sort((a: any, b: any) => b.score - a.score)
          .slice(0, 5);
      }
    }
  }

  getLowPerformers(batchName: string, assessmentName: string): void {
    const batch = this.tableData.batches.find((batch: any) => batch.batchName === batchName);
    if (batch) {
      const assessment = batch.assessments.find((assessment: any) => assessment.assessmentName === assessmentName);
      if (assessment) {
        this.filteredData = assessment.trainees
          .sort((a: any, b: any) => a.score - b.score)
          .slice(0, 5);
      }
    }
  }
}
