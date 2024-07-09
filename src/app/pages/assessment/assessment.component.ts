import { Component, Input } from '@angular/core';
import { AssessmentPreviewComponent } from './components/assessment-preview/assessment-preview.component';
import { ActivatedRoute } from '@angular/router';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { AssessmentEditComponent } from './components/assessment-edit/assessment-edit.component';
import { CommonModule } from '@angular/common';
import { AssessmentEvaluateComponent } from './components/assessment-evaluate/assessment-evaluate.component';


interface Question {
  type: string;
  content: string;
  options?: string[];
  correctAnswer?: string;
  score: number;
  userAnswer?: string;
}

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule, AssessmentPreviewComponent, AssessmentEditComponent, AssessmentEvaluateComponent],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.scss'
})
export class AssessmentComponent {
  @Input() evaluate: boolean = false;
  htmlContent!: string;
  questions: Question[] = [];

  showPreview = true;
  editQuestions: any;

  onEditClicked() {
    this.showPreview = false;
    this.editQuestions = this.questions;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.htmlContent = history.state.htmlContent;
    console.log('Received HTML Content:', this.htmlContent);
    this.parseQuestions(this.htmlContent);

    if(this.evaluate){
      this.showPreview = false;
    }
  }

  parseQuestions(htmlContent: string) {
    console.log('Parsing HTML content:', htmlContent);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    
    let currentQuestion: any | null = null;

    paragraphs.forEach((p) => {
      const text = p.innerText.trim();

      if (text.startsWith('Question:')) {
        if (currentQuestion) {
          this.questions.push(currentQuestion);
        }
        currentQuestion = {
          type: 'unknown',
          content: text.replace('Question:', '').trim(),
          options: [],
          correctAnswer: '',
          score: 0
        };
      } else if (text.startsWith('Options:')) {
        currentQuestion!.type = 'mcq';
      } else if (text.startsWith('Correct Answer:')) {
        currentQuestion!.correctAnswer = text.replace('Correct Answer:', '').trim();
      } else if (text.startsWith('Score:')) {
        currentQuestion!.score = parseInt(text.replace('Score:', '').trim(), 10);
      } else if (currentQuestion && currentQuestion.type === 'mcq' && /^[A-Z]\./.test(text)) {
        currentQuestion.options!.push(text);
      } else if (currentQuestion && currentQuestion.type === 'unknown') {
        if (currentQuestion.content.startsWith('Fill in the blank')) {
          currentQuestion.type = 'fillup';
          currentQuestion.correctAnswer = text.replace('____', '').trim();
        } else {
          currentQuestion.type = 'descriptive';
          currentQuestion.correctAnswer = text.trim();
        }
      }
    });

    if (currentQuestion) {
      this.questions.push(currentQuestion);
    }

    console.log('Parsed questions:', this.questions);
  }
}
