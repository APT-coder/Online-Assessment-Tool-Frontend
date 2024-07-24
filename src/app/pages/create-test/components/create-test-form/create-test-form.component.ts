import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { QuestionDropdownComponent } from '../question-dropdown/question-dropdown.component';
import { McqFormComponent } from '../mcq-form/mcq-form.component';
import { DescriptiveFormComponent } from '../descriptive-form/descriptive-form.component';
import { FillInTheBlanksFormComponent } from '../fill-in-the-blanks-form/fill-in-the-blanks-form.component';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component'; 
import { ScheduleComponent } from '../schedule/schedule.component'; 
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentPreviewComponent } from "../../../assessment/components/assessment-preview/assessment-preview.component";
import { Router } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { AssessmentService } from '../../../../service/assessment/assessment.service';
import { Assessment } from '../../../../../models/assessment.interface'; 
import { ScheduledAssessmentService } from '../../../../service/scheduled-assessment/scheduled-assessment.service';

interface Option {
  option: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-create-test-form',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    QuestionDropdownComponent,
    McqFormComponent,
    DescriptiveFormComponent,
    FillInTheBlanksFormComponent,
    ButtonActiveComponent,
    ScheduleComponent,
    MatIconModule,
    FormsModule,
    AssessmentPreviewComponent,
    MatInputModule,
    MatFormField,
    ReactiveFormsModule
  ],
  templateUrl: './create-test-form.component.html',
  styleUrls: ['./create-test-form.component.scss']
})
export class CreateTestFormComponent implements OnInit {
  @ViewChild('stepper')
  stepper!: MatStepper;
  @ViewChild(ScheduleComponent) scheduleComponent!: ScheduleComponent;

  user = JSON.parse(localStorage.getItem('userDetails') as string);

  showScrollToTopButton = false;
  showScrollToBottomButton = true;

  questions: { id: number, type: string, score: number, content: string, options: Option[], correctAnswer: string }[] = [{ id: 1, type: '', score: 0, content: '', options: [], correctAnswer: '' }];
  assessmentCreated!: boolean;
  createdBy: number = this.user.UserId;
  assessment: Assessment = { assessmentId: 0, assessmentName: '', createdBy: 0, createdOn: new Date() };
  constructor(private router: Router, private assessmentService: AssessmentService, private scheduledAssessmentService: ScheduledAssessmentService) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('hasReloaded')) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
    }
  }

  createAssessment(assessmentName: string) {
    if (assessmentName) {
      this.assessmentService.createAssessment(assessmentName, this.createdBy).subscribe(
        (response: any) => {
          this.assessmentCreated = true;
          this.assessment = response.result;
      
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

  onQuestionTypeSelected(questionType: string, index: number) {
    this.questions[index].type = questionType;
  }

  addNewQuestion() {
    const newQuestionId = this.questions.length + 1;
    this.questions.push({ id: 1, type: '', score: 0, content: '', options: [], correctAnswer: '' });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  onMcqData(data: any, index: number) {
    this.questions[index].content = data.question;
    const correctChoice = data.options.find((option: Option) => option.isCorrect);
    this.questions[index].correctAnswer = correctChoice.option;
    this.questions[index].options = data.options.map((option: Option) => option.option);
  }

  onDescData(data: any, index: number) {
    this.questions[index].content = data.question;
    this.questions[index].correctAnswer = data.answer;
  }

  onFillData(data: any, index: number) {
    this.questions[index].content = data.question;
    this.questions[index].correctAnswer = data.answer;
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

  completeStep() {
    this.stepper.next();
    this.stepper.steps.toArray()[0].completed = true;
    this.stepper.steps.toArray()[0].editable = false;
  }

  finishSchedule() {
    if (this.scheduleComponent) {
      const formResult = this.scheduleComponent.logFormValues();
      console.log(formResult);
      this.scheduledAssessmentService.scheduleAssessment(formResult).subscribe((response: any) => {
        console.log('Question posted successfully', response);

        this.scrollToTop();

        setTimeout(() => {
          //this.router.navigate(['/sidebar']);
        }, 5000);
      }, (error: any) => {
        console.error('Error posting question', error);
      });
    } 
  }


  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTopButton = window.scrollY > 0;
    this.showScrollToBottomButton = window.innerHeight + window.scrollY < document.body.scrollHeight;
  }
}
