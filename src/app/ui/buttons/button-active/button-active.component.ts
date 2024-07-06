import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-active',
  standalone: true,
  imports: [],
  templateUrl: './button-active.component.html',
  styleUrl: './button-active.component.scss'
})
export class ButtonActiveComponent {
  @Input() content: string = '';
}
