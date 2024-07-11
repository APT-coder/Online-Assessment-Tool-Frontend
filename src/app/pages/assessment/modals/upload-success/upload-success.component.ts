import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonNormalComponent } from '../../../../ui/buttons/button-normal/button-normal.component';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../../ui/buttons/button-inactive/button-inactive.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-success',
  standalone: true,
  imports: [ButtonNormalComponent, ButtonActiveComponent, ButtonInactiveComponent],
  templateUrl: './upload-success.component.html',
  styleUrl: './upload-success.component.scss'
})
export class UploadSuccessComponent {
  htmlContent: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { htmlContent: string },
    private router: Router,
    private dialogRef: MatDialogRef<UploadSuccessComponent>
  ) {
    this.htmlContent = data.htmlContent;
    console.log(this.htmlContent);
  }

  prepareTestAndCloseModal() {
    this.dialogRef.close();
    this.router.navigate(['/upload-assessment'], { state: { htmlContent: this.htmlContent } });
  }
}
