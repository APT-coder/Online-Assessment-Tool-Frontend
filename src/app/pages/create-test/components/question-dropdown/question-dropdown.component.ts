import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-question-dropdown',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './question-dropdown.component.html',
  styleUrl: './question-dropdown.component.scss'
})
export class QuestionDropdownComponent {
  @Input() questionNumber!: number;
  @Output() selectedType = new EventEmitter<string>();

  onSelectionChange(event: any) {
    this.selectedType.emit(event.value);
  }
}
