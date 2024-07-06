import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-inactive',
  standalone: true,
  imports: [],
  templateUrl: './button-inactive.component.html',
  styleUrl: './button-inactive.component.scss'
})
export class ButtonInactiveComponent {
  @Input() content: string = '';
}
