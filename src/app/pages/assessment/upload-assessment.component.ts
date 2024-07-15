import { Component, Input, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssessmentPreviewComponent } from './components/assessment-preview/assessment-preview.component';
import { AssessmentEditComponent } from './components/assessment-edit/assessment-edit.component';
import { AssessmentEvaluateComponent } from './components/assessment-evaluate/assessment-evaluate.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonActiveComponent } from '../../ui/buttons/button-active/button-active.component';
import { ScheduleComponent } from '../create-test/components/schedule/schedule.component';
import { MessageServiceComponent } from '../../components/message-service/message-service.component';

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
  imports: [
    CommonModule,
    AssessmentPreviewComponent,
    AssessmentEditComponent,
    AssessmentEvaluateComponent,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    SidebarComponent,
    MatIconModule,
    ButtonActiveComponent,
    ScheduleComponent,
    MessageServiceComponent
  ],
  templateUrl: './upload-assessment.component.html',
  styleUrls: ['./upload-assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  @Input() evaluate: boolean = false;
  @ViewChild('messageComponent') messageComponent!: MessageServiceComponent;
  
  htmlContent!: string;
  questions: Question[] = [];
  showPreview = true;
  editQuestions: any;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  showScrollToTopButton = false;
  showScrollToBottomButton = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('hasReloaded')) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
      this.initializeComponent();
    }
  }

  initializeComponent(): void {
    this.htmlContent = history.state.htmlContent;
    console.log('Received HTML Content:', this.htmlContent);
    this.parseQuestions(this.htmlContent);

    if (this.evaluate) {
      this.showPreview = false;
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.editQuestions = this.questions;
  }

  onQuestionsChange(updatedQuestions: Question[]) {
    this.questions = updatedQuestions;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    this.showScrollToTopButton = scrollPosition > 500;
    this.showScrollToBottomButton = scrollPosition + windowHeight < documentHeight - 500;
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

  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  finishSchedule() {
    this.scrollToTop();
    this.messageComponent.isVisible = true; 
    this.messageComponent.ngOnInit();

    // After a delay, navigate to the dashboard
    setTimeout(() => {
      this.router.navigate(['/sidebar']);
    }, 5000);
  }
}
