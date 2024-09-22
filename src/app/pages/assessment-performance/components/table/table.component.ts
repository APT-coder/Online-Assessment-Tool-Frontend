import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PerformanceDetailsService } from '../../../../service/performance-details/performance-details.service';
import { DropdownModule } from 'primeng/dropdown';

interface Trainee {
  traineeName: string;
  isPresent: string;
  score: number;
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, TagModule, InputTextModule, HttpClientModule, CommonModule, FormsModule, DropdownModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  @Input() trainees!: Trainee[];
  @Output() filteredData = new EventEmitter<Trainee[]>();

  statuses!: any[];
  loading: boolean = true;
  showSearch = false;
  originalProducts!: Trainee[];
  assessmentId: any;
  selectedStatus: string = ''; 

  constructor(private route: ActivatedRoute,private performanceService: PerformanceDetailsService) {}

  ngOnInit() {
    this.statuses = [
      { label: 'Completed', value: 'completed' },
      { label: 'Absent', value: 'absent' },
    ];

    this.originalProducts = [...this.trainees];
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

  onTableFilter(event: any) {
    const filteredValue = event.filteredValue;
    this.filteredData.emit(filteredValue);
  }
}