import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-inactive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-inactive.component.html',
  styleUrl: './button-inactive.component.scss'
})
export class ButtonInactiveComponent {
  @Input() content: string = '';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() customClasses: string[] = [];
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  
  onClick(): void {
    this.buttonClick.emit();
  }
}
