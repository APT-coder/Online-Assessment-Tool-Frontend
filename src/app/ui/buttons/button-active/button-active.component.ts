import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-active',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-active.component.html',
  styleUrl: './button-active.component.scss'
})
export class ButtonActiveComponent {
  @Input() content: string = '';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() customClasses: string[] = [];
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  
  onClick(): void {
    this.buttonClick.emit();
  }
}
