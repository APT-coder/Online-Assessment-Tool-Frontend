import { Component } from '@angular/core';
import { ButtonNormalComponent } from '../../../ui/buttons/button-normal/button-normal.component';

@Component({
  selector: 'app-test-success',
  standalone: true,
  imports: [ButtonNormalComponent],
  templateUrl: './test-success.component.html',
  styleUrl: './test-success.component.scss'
})
export class TestSuccessComponent {

}
