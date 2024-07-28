import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button-dashboard',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './button-dashboard.component.html',
  styleUrl: './button-dashboard.component.scss'
})
export class ButtonDashboardComponent {
  @Input() content: string = '';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() customClasses: string[] = [];
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  
  onClick(): void {
    this.buttonClick.emit();
  }
}
