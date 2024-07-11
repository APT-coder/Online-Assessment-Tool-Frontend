import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Trainee {
  trainee: string;
  status: string;
  marks: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, TagModule, InputTextModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  trainees!: Trainee[];
  statuses!: any[];
  loading: boolean = true;
  showSearch = false;
  originalProducts!: Trainee[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTraineesData();

    this.statuses = [
      { label: 'Completed', value: 'completed' },
      { label: 'Absent', value: 'absent' },
    ];
  }

  fetchTraineesData() {
    const data = {
      data: [
        { trainee: 'John Doe', status: 'completed', marks: 45 },
        { trainee: 'Jane Smith', status: 'absent', marks: 0 },
        { trainee: 'Alice Johnson', status: 'completed', marks: 40 },
        { trainee: 'Bob Brown', status: 'completed', marks: 48 },
        { trainee: 'Charlie Davis', status: 'completed', marks: 38 },
        { trainee: 'Diana Evans', status: 'absent', marks: 0 },
        { trainee: 'Eve White', status: 'completed', marks: 47 },
        { trainee: 'Frank Green', status: 'completed', marks: 44 },
        { trainee: 'Grace Hall', status: 'completed', marks: 50 },
        { trainee: 'Hank Lee', status: 'completed', marks: 42 }
      ]
    };
    this.trainees = data.data;
    this.originalProducts = [...this.trainees]; 
    this.loading = false;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'completed':
        return 'success';
      case 'absent':
        return 'danger';
      default:
        return 'info';
    }
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.trainees = this.originalProducts.filter(trainee =>
        trainee.trainee.toLowerCase().includes(searchTerm)
      );
    } else {
      this.trainees = [...this.originalProducts];
    }
  }
}
