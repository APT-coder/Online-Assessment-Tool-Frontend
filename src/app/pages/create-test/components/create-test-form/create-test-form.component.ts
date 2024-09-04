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
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../../../../ui/buttons/button/button.component';
import { Button } from 'primeng/button';
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
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    CardComponent,
    ButtonComponent,
    Button,
    
  ],
  providers:[MessageService],
  templateUrl: './create-test-form.component.html',
  styleUrls: ['./create-test-form.component.scss']
})
export class CreateTestFormComponent implements OnInit {
  @ViewChild('stepper')
  stepper!: MatStepper;
  @ViewChild(ScheduleComponent) scheduleComponent!: ScheduleComponent;
  selectedCardIndex: number | null = null;
  isCardSelected: boolean = false;
  assessmentName: string = '';

  selectCard(index: number) {
    this.selectedCardIndex = index;
    this.isCardSelected=true;
  }

  user = JSON.parse(localStorage.getItem('userDetails') as string);

  showScrollToTopButton = false;
  showScrollToBottomButton = true;

  questions: { id: number, type: string, score: number, content: string, options: Option[], correctAnswer: string[] }[] = [{ id: 1, type: '', score: 0, content: '', options: [], correctAnswer: [] }];
  assessmentCreated!: boolean;
  totalScore: number = 0;
  createdBy: number = this.user.TrainerId;
  dashboard = localStorage.getItem("dashboard");
  assessment: Assessment = { assessmentId: 0, assessmentName: '', createdBy: 0, createdOn: new Date() };
  constructor(private router: Router, private assessmentService: AssessmentService, private scheduledAssessmentService: ScheduledAssessmentService, private messageService: MessageService) {}

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


  submitQuestions(formattedQuestions: any[]) {
    const assessmentId = this.assessment.assessmentId;
    formattedQuestions.forEach(question => {
      this.assessmentService.postQuestion(assessmentId, question, this.createdBy).subscribe((response: any) => {
        console.log('Question posted successfully', response);
        this.completeStep(0);
        this.completeStep(1);
      }, (error: any) => {
        console.error('Error posting question', error);
      });
    });
    this.updateTotalScore();
  }

  onQuestionTypeSelected(questionType: string, index: number) {
    this.questions[index].type = questionType;
  }

  addNewQuestion() {
    const newQuestionId = this.questions.length + 1;
    this.questions.push({ id: 1, type: '', score: 0, content: '', options: [], correctAnswer: [] });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  onMcqData(data: any, index: number) {
    this.questions[index].content = data.question;
    const correctChoices = data.options
        .filter((option: Option) => option.isCorrect)
        .map((option: Option) => option.option);
    this.questions[index].correctAnswer = correctChoices;    
    this.questions[index].options = data.options.map((option: Option) => option.option);
  }

  onDescData(data: any, index: number) {
    this.questions[index].content = data.question;
    this.questions[index].correctAnswer = [data.answer];
  }

  onFillData(data: any, index: number) {
    this.questions[index].content = data.question;
    this.questions[index].correctAnswer = [data.answer];
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

  completeStep(id: number) {
    this.stepper.next();
    this.stepper.steps.toArray()[id].completed = true;
    this.stepper.steps.toArray()[id].editable = false;
  }

  finishSchedule() {
    if (this.scheduleComponent) {
      const formResult = this.scheduleComponent.logFormValues();
      console.log(formResult);
      this.scheduledAssessmentService.scheduleAssessment(formResult).subscribe((response: any) => {
        console.log('Question scheduled successfully', response);
        this.messageService.add({ severity: 'success', summary: 'Assessment Scheduled ', detail: 'Assessment Scheduled Successfully', life: 3000 });

        this.scrollToTop();

        setTimeout(() => {
          this.router.navigate([`/app/${this.dashboard}`]);
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
