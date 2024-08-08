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
import { Assessment } from '../../../models/assessment.interface';
import { AssessmentService } from '../../service/assessment/assessment.service';
import { FileUploadComponent } from './modals/file-upload/file-upload.component';
import { ScheduledAssessmentService } from '../../service/scheduled-assessment/scheduled-assessment.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
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
    FileUploadComponent,
    MessagesModule,
    MessageModule
  ],
  providers:[MessageService],
  templateUrl: './upload-assessment.component.html',
  styleUrls: ['./upload-assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  @ViewChild('stepper')
  stepper!: MatStepper;

  @ViewChild(ScheduleComponent) scheduleComponent!: ScheduleComponent;

  user = JSON.parse(localStorage.getItem('userDetails') as string);
  
  htmlContent!: string;
  questionContent: any;
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
  totalScore: number = 0;
  assessment: Assessment = { assessmentId: 0, assessmentName: '', createdBy: 0, createdOn: new Date() };
  createdBy: number = this.user.TrainerId;
  dashboard = localStorage.getItem("dashboard");

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private assessmentService: AssessmentService,
    private scheduledAssessmentService: ScheduledAssessmentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log(this.createdBy);
    console.log(this.dashboard);
  
    if (!sessionStorage.getItem('hasReloaded')) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
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
    this.startFormGroup = this._formBuilder.group({
      startCtrl: ['', Validators.required]
    });
  }

  async previewTest() {
    this.completeStep(0);
    this.initializeComponent();
  }
  
  async initializeComponent(): Promise<void> {
    this.htmlContent = localStorage.getItem("htmlContent") as string;
    this.questionContent = JSON.parse(localStorage.getItem("questionContent") as string);
    
    if(this.htmlContent != null){
      await this.parseQuestions(this.htmlContent); // Wait for parsing to complete
    }
    else{
      await this.convertData(this.questionContent);
    }
  
    this.editQuestions = this.questions;
  }

  completeStep(id: number) {
    this.stepper.next();
    this.stepper.steps.toArray()[id].completed = true;
    this.stepper.steps.toArray()[id].editable = false;
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

  parseQuestions(htmlContent: string): Promise<void> {
    return new Promise((resolve) => {
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
      resolve();
    });
  }
  
  convertData(inputData: any[]): Promise<Question[]> {
    return new Promise((resolve, reject) => {
      try {
        // Extract header and data
        const headers = inputData[0];
        const data = inputData.slice(1);

        // Define the mapping for indices
        const indexMap = {
          id: 0,
          type: 1,
          content: 2,
          options: 3,
          correctAnswer: 4,
          score: 5
        };

        // Convert data to the desired format
        this.questions = data.map(row => {
          return {
            id: row[indexMap.id],
            type: row[indexMap.type],
            content: row[indexMap.content],
            options: row[indexMap.options] ? this.parseOptions(row[indexMap.options]) : [],
            correctAnswer: row[indexMap.correctAnswer] || null,
            score: row[indexMap.score]
          };
        });
        console.log(this.questions);
        resolve(this.questions);
      } catch (error) {
        reject(error);
      }
    });
  }

  private parseOptions(optionsString: string): string[] {
    // Split the options string into an array
    return optionsString.split(', ').map(option => option.split(': ')[1]);
  }

  createAssessment(assessmentName: string) {
    if (assessmentName) {
      this.assessmentService.createAssessment(assessmentName, this.createdBy).subscribe(
        (response: any) => {
          this.assessmentCreated = true;
          this.assessment = response.result;
          localStorage.setItem("assessmentId", (this.assessment.assessmentId).toString());
         
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

  calculateTotalScore() {
    this.questions.forEach(question => {
      this.totalScore += question.score;
    })
    return this.totalScore;
  }

  updateTotalScore() {
    const assessmentId = this.assessment.assessmentId;
    const totalScore = this.calculateTotalScore();
    this.assessmentService.updateAssessment(assessmentId, totalScore).subscribe((response: any) => {
      console.log('Question score posted successfully', response);
      this.completeStep(1);
      this.completeStep(2);
    }, (error: any) => {
      console.error('Error posting question', error);
    });
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
      }, (error: any) => {
        console.error('Error posting question', error);
      });
    });
    this.updateTotalScore();
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
        console.log('Question scheduled successfully', response);
        this.messageService.add({ severity: 'success', summary: ' Assessment Scheduled', detail: 'Sheduling Assessment Successful', life: 3000 });

        this.scrollToTop();
        

        setTimeout(() => {
          this.router.navigate([`/${this.dashboard}`]);
        }, 5000);
      }, (error: any) => {
        console.error('Error posting question', error);
      });
    } 
  }
}
