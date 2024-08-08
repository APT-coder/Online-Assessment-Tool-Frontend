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
  questionContent: any;
  questionCount: number = 0;

  constructor(private router: Router)
  {
    this.htmlContent = localStorage.getItem("htmlContent") as string;
    console.log(this.htmlContent);

    this.questionContent = JSON.parse(localStorage.getItem("questionContent") as string);
    console.log(this.questionContent);

    if(this.htmlContent != null){
      this.questionCount = this.getQuestionCount(this.htmlContent, "word");
    }
    else{
      this.questionCount = this.getQuestionCount(this.questionContent, "excel");
    }
  }

  @Output() prepareTest = new EventEmitter<void>();

  onPrepareTest() {
    this.prepareTest.emit();
  }

  getQuestionCount(content: any, type: string): number {
    let questionCount = 0;

    if(type === "word"){
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const paragraphs = doc.querySelectorAll('p');
      paragraphs.forEach((p) => {
        const text = p.innerText.trim();
        if (text.startsWith('Question:')) {
          questionCount++;
        }
      });
    }

    else if(type === "excel"){
      if (!Array.isArray(content) || content.length < 1) {
        return 0;
      }
      const questions = content.slice(1);
      console.log(questions.length);
      questionCount = questions.length;
    }

    return questionCount;
  }

  returnToDashboard() {
    this.router.navigate(['/admin']);
  }
}
