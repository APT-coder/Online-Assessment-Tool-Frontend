import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
  dashboard = localStorage.getItem("dashboard");
  htmlContent: string;

  constructor(private router: Router,)
  {
    this.htmlContent = localStorage.getItem("htmlContent") as string;
    console.log(this.htmlContent);
  }

  @Output() prepareTest = new EventEmitter<void>();

  onPrepareTest() {
    this.prepareTest.emit();
  }

  returnToDashboard() {
    this.router.navigate(['/admin']);
  }
}
