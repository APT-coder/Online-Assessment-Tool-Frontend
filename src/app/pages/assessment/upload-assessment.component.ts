import { Component, Input, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssessmentPreviewComponent } from './components/assessment-preview/assessment-preview.component';
import { AssessmentEditComponent } from './components/assessment-edit/assessment-edit.component';
import { AssessmentEvaluateComponent } from './components/assessment-evaluate/assessment-evaluate.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonActiveComponent } from '../../ui/buttons/button-active/button-active.component';
import { ScheduleComponent } from '../create-test/components/schedule/schedule.component';
import { MessageServiceComponent } from '../../components/message-service/message-service.component';
import { Assessment } from '../../../models/assessment.interface';
import { AssessmentService } from '../../service/assessment/assessment.service';
import { FileUploadComponent } from './modals/file-upload/file-upload.component';
import { ScheduledAssessmentService } from '../../service/scheduled-assessment/scheduled-assessment.service';

interface Question {
  id: string
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
    MessageServiceComponent,
    FileUploadComponent
  ],
  templateUrl: './upload-assessment.component.html',
  styleUrls: ['./upload-assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  @ViewChild('stepper')
  stepper!: MatStepper;
  @ViewChild('messageComponent') messageComponent!: MessageServiceComponent;
  @ViewChild(ScheduleComponent) scheduleComponent!: ScheduleComponent;

  user = JSON.parse(localStorage.getItem('userDetails') as string);
  
  htmlContent!: string;
  questions: Question[] = [];
  showPreview = true;
  editQuestions: any;
  isLinear = false;
  startFormGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  showScrollToTopButton = false;
  showScrollToBottomButton = true;

  assessmentCreated!: boolean;
  assessment: Assessment = { assessmentId: 0, assessmentName: '', createdBy: 0, createdOn: new Date() };
  createdBy: number = this.user.UserId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private assessmentService: AssessmentService,
    private scheduledAssessmentService: ScheduledAssessmentService
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
    this.htmlContent = localStorage.getItem("htmlContent") as string;
    console.log('Received HTML Content:', this.htmlContent);
    this.parseQuestions(this.htmlContent);

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

  completeStep() {
    this.stepper.next();
    this.stepper.steps.toArray()[0].completed = true;
    this.stepper.steps.toArray()[0].editable = false;
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

  createAssessment(assessmentName: string) {
    if (assessmentName) {
      this.assessmentService.createAssessment(assessmentName, this.createdBy).subscribe(
        (response: any) => {
          this.assessmentCreated = true;
          this.assessment = response.result;
          localStorage.setItem("assessmentId", (this.assessment.assessmentId).toString());
          this.messageService();
          console.log('Assessment successfully created!', this.assessment);
        },
        (error: any) => {
          console.error('Error creating assessment', error);
        }
      );
    } else {
      console.error('Assessment name is required.');
    }
  }

  logQuestions() {
    
    const formattedQuestions = this.questions.map(question => {
      let formattedQuestion = {
        id: question.id,
        type: question.type,
        content: question.content,
        options: question.options,
        correctAnswer: question.correctAnswer,
        score: question.score
      };
      return formattedQuestion;
    });

    console.log('Formatted Questions:', formattedQuestions);
    this.submitQuestions(formattedQuestions);
}

  submitQuestions(formattedQuestions: any[]) {
    const assessmentId = this.assessment.assessmentId; 
    formattedQuestions.forEach(question => {
      this.assessmentService.postQuestion(assessmentId, question, this.createdBy).subscribe((response: any) => {
        console.log('Question posted successfully', response);
        this.completeStep();
      }, (error: any) => {
        console.error('Error posting question', error);
      });
    });
  }

  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  finishSchedule() {
    if (this.scheduleComponent) {
      const formResult = this.scheduleComponent.logFormValues();
      console.log(formResult);
      this.scheduledAssessmentService.scheduleAssessment(formResult).subscribe((response: any) => {
        console.log('Question posted successfully', response);

        this.scrollToTop();
        this.messageComponent.isVisible = true; 
        this.messageComponent.ngOnInit();

        setTimeout(() => {
          //this.router.navigate(['/sidebar']);
        }, 5000);
      }, (error: any) => {
        console.error('Error posting question', error);
      });
    } 
  }

  messageService() {
    this.messageComponent.isVisible = true; 
    this.messageComponent.ngOnInit();

    setTimeout(() => {
    }, 5000);
  }
}
