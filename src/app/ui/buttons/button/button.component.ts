import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() label: string = 'Button';
  @Input() disabled: boolean = false;
  @Input() routerLink: string | any[] | null = null;
  @Input() customClass: string = ''; 
  @Input() customStyles: { [key: string]: string } = {};

  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }

}
