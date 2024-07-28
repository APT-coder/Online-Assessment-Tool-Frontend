import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AdminDashboardService } from '../../../../service/admin-dashboard/admin-dashboard.service';

@Component({
  selector: 'app-trainer-table',
  standalone: true,
  imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule],
  templateUrl: './trainer-table.component.html',
  styleUrl: './trainer-table.component.scss'
})
export class TrainerTableComponent {

  trainerList: string[] = [];

  @ViewChild('dt2') dt2!: Table;

  constructor(private trainerService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchTrainerNames();
  }

  fetchTrainerNames(): void {
    this.trainerService.getTrainerList().subscribe(
      (data: string[]) => {
        this.trainerList = data;
      },
      (error) => {
        console.error('Error fetching trainer names', error);
      }
    );
  }

  filterGlobal(event: Event, field: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = (inputElement?.value || '').toLowerCase(); 
    this.dt2.filterGlobal(value, 'contains'); 
  }

}
