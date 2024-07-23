import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { faFilter, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AssessmentOverview } from '../../../../../models/assessmentOverview.interface';

@Component({
  selector: 'app-table-dashboard',
  standalone: true,
  imports: [CommonModule ,TableModule, ButtonModule, FontAwesomeModule],
  templateUrl: './table-dashboard.component.html',
  styleUrl: './table-dashboard.component.scss'
})
export class TableDashboardComponent {
  faPen = faPen;
  faTrash = faTrash;
  faFilter = faFilter;

  @Input() tableData: AssessmentOverview[] = [];
  @Output() assessmentSelected = new EventEmitter<number>(); // Emit assessmentId

  onRowClick(assessmentId: number) {
    console.log('Clicked Assessment ID:', assessmentId); 
    this.assessmentSelected.emit(assessmentId);
    console.log('Assessment ID emitted:', assessmentId);
  }
}
