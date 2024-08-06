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
  questionCount: number = 0;

  constructor(private router: Router,)
  {
    this.htmlContent = localStorage.getItem("htmlContent") as string;
    console.log(this.htmlContent);

    this.questionCount = this.getQuestionCount(this.htmlContent);
  }

  @Output() prepareTest = new EventEmitter<void>();

  onPrepareTest() {
    this.prepareTest.emit();
  }

  getQuestionCount(htmlContent: string): number {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
  
    let questionCount = 0;
  
    paragraphs.forEach((p) => {
      const text = p.innerText.trim();
      if (text.startsWith('Question:')) {
        questionCount++;
      }
    });
  
    return questionCount;
  }

  returnToDashboard() {
    this.router.navigate(['/admin']);
  }
}
