import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface DropdownOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() placeholderText: string = 'Select Option';
  @Input() options: DropdownOption[] = [];
  @Output() selectionChange: EventEmitter<DropdownOption> = new EventEmitter<DropdownOption>();

  selectedOption: DropdownOption | undefined;
 
  ngOnInit() {
    
  }

  onOptionChange() {
    this.selectionChange.emit(this.selectedOption);
  }
}
