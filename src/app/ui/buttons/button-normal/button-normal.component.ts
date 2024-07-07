import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-normal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-normal.component.html',
  styleUrl: './button-normal.component.scss'
})
export class ButtonNormalComponent {
  @Input() content: string = '';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() customClasses: string[] = [];
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  
  onClick(): void {
    this.buttonClick.emit();
  }
}
