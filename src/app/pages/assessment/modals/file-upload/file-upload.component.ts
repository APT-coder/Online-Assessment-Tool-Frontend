import { Component } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../../ui/buttons/button-inactive/button-inactive.component';
import { ButtonNormalComponent } from '../../../../ui/buttons/button-normal/button-normal.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ButtonActiveComponent, ButtonInactiveComponent, ButtonNormalComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

}
