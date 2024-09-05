import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

interface Column {
  field: string;
  header: string;
  type?: string;
  fixed?: boolean;
  filter?: boolean;
  filterType?: string;
}

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [TableModule, MultiSelectModule, CommonModule, FormsModule, ButtonModule, TagModule, DropdownModule],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss'
})
export class DashboardTableComponent {
  @Input() tableData: any;
  @Input() defaultSortField: string = "";
  @Input() defaultSortOrder: number = 0;
  @Input() dataKey: string = "";
  @Input() action: boolean = false;
  @Input() cols: Column[] = [];
  @Input() status: any;
  @Output() rowSelected = new EventEmitter<string>();

  selectableColumns: Column[] = [];
  selectedColumns: Column[] = [];
  fixedColumns: Column[] = [];
  filterColumns: string[] = [];
  searchValue: string = '';
  selectedStatus: string = ''; 
  selectedRow: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.selectedColumns = this.cols;
    this.fixedColumns = this.cols.filter(col => col.fixed);
    this.selectableColumns = this.cols.filter(col => !col.fixed);
    this.filterColumns = this.cols
      .filter(col => col.filter)
      .map(col => col.field);
  }

  onSelectionChange(event: any) {
    const selectedNonFixedColumns = event.value.filter((col: Column) => !col.fixed);
    this.selectedColumns = [...this.fixedColumns, ...selectedNonFixedColumns];
    this.selectedColumns = this.cols.filter(col => this.selectedColumns.includes(col));
    console.log(this.selectedColumns);
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  applyGlobalFilter(dt1: any, value: string) {
    dt1.filterGlobal(value, 'contains');
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status.toLowerCase()) {
        case 'upcoming':
            return 'danger';

        case 'evaluated':
            return 'success';

        case 'cancelled':
            return 'secondary';

        case 'Completed':
            return 'warning';

        case 'renewal':
            return undefined;
    }
    return undefined;
  }

  navigateToRoute(data: any, status: string) {
    if(status === 'evaluated'){
      this.router.navigate([`/app/performance/${data[this.dataKey]}`]);
    }
    else if(status === 'completed'){
      this.router.navigate([`/app/evaluate/${data[this.dataKey]}`]);
    }
  }

  onRowSelect(event: any) {
    console.log(event.data);
    this.rowSelected.emit(event.data);
  }
}
