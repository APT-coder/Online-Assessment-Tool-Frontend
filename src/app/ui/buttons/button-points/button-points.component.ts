import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-points',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-points.component.html',
  styleUrl: './button-points.component.scss'
})
export class ButtonPointsComponent {
  @Input() content:string='';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() customClasses: string[] = [];
}
