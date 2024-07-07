import { Component } from '@angular/core';
import { ButtonNormalComponent } from '../../../ui/buttons/button-normal/button-normal.component';
import { ButtonActiveComponent } from '../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../ui/buttons/button-inactive/button-inactive.component';

@Component({
  selector: 'app-upload-success',
  standalone: true,
  imports: [ButtonNormalComponent, ButtonActiveComponent, ButtonInactiveComponent],
  templateUrl: './upload-success.component.html',
  styleUrl: './upload-success.component.scss'
})
export class UploadSuccessComponent {

}
