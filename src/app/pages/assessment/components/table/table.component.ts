import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PerformanceDetailsService } from '../../../../service/performance-details/performance-details.service';

interface Trainee {
  traineeName: string;
  isPresent: string;
  score: number;
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, TagModule, InputTextModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  trainees!: Trainee[];
  statuses!: any[];
  loading: boolean = true;
  showSearch = false;
  originalProducts!: Trainee[];
  assessmentId: any;

  constructor(private route: ActivatedRoute,private performanceService: PerformanceDetailsService) {}

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
      this.assessmentId = params.get('scheduledAssessmentId')!;
      this.fetchTraineesData(this.assessmentId);
    });
    this.statuses = [
      { label: 'Completed', value: 'completed' },
      { label: 'Absent', value: 'absent' },
    ];
  }

  fetchTraineesData(assessmentId:number) {
    this.performanceService.getTrainees(assessmentId).subscribe(
      (data: Trainee[]) => {
        this.trainees = data;
        this.originalProducts = [...this.trainees]; 
        this.loading = false;
      },
      error => {
        console.error('Error fetching trainees data', error);
        this.loading = false;
      }
    );
  }

  getSeverity(status: string) {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Absent':
        return 'danger';
      default:
        return 'info';
    }
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.trainees = this.originalProducts.filter(trainee =>
        trainee.traineeName.toLowerCase().includes(searchTerm)
      );
    } else {
      this.trainees = [...this.originalProducts];
    }
  }
}