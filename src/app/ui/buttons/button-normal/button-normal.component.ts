import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-normal',
  standalone: true,
  imports: [],
  templateUrl: './button-normal.component.html',
  styleUrl: './button-normal.component.scss'
})
export class ButtonNormalComponent {
  @Input() content: string = '';
}
