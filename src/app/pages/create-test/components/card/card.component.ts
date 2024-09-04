import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule,NgClass,NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() header: string = 'Default Header';  // Card header
  @Input() subheader: string = '';             // Card subheader
  @Input() description: string = '';               // Card content
  @Input() imageUrl: string = '';              // Card image
  @Input() saveButtonLabel: string = 'Save'; 
  @Input() isSelected: boolean = false;        // Save button label

  @Output() select = new EventEmitter<void>();

  onSelect() {
    this.select.emit(); 
  }
}
