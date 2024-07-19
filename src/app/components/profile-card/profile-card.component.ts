import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() role: string = '';
  @Input() course: string = '';

  @Output() cardClicked = new EventEmitter<void>();

  onCardClick() {
    this.cardClicked.emit();
  }

}
