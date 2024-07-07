import { Component } from '@angular/core';
import { ButtonNormalComponent } from '../../../ui/buttons/button-normal/button-normal.component';
import { ButtonActiveComponent } from '../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../ui/buttons/button-inactive/button-inactive.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ButtonNormalComponent, ButtonActiveComponent, ButtonInactiveComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

}
