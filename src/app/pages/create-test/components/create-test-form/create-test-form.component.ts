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
import { FormsModule } from '@angular/forms';
import { AssessmentPreviewComponent } from "../../../assessment/components/assessment-preview/assessment-preview.component";
import { MessageServiceComponent } from '../../../../components/message-service/message-service.component';
import { Router } from '@angular/router';

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
    MessageServiceComponent
  ],
  templateUrl: './create-test-form.component.html',
  styleUrls: ['./create-test-form.component.scss']
})
export class CreateTestFormComponent implements OnInit {
  @ViewChild('stepper')
  stepper!: MatStepper;
  @ViewChild('messageComponent') messageComponent!: MessageServiceComponent;

  showScrollToTopButton = false;
  showScrollToBottomButton = true;

  questions: { id: number, type: string, score: number, content: string, options: Option[], correctAnswer: string }[] = [{ id: 1, type: '', score: 0, content: '', options: [], correctAnswer: '' }];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('hasReloaded')) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('hasReloaded');
      // Any additional initialization logic can go here
    }
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
    const currentStepIndex = this.stepper.selectedIndex;
    if (currentStepIndex === 1) {
      const formattedQuestions = this.questions.map(question => {
        let formattedQuestion = {
          id: question.id,
          type: question.type,
          content: question.content, // Replace with actual content based on type if needed
          options: question.options, // Replace with actual options if applicable
          correctAnswer: question.correctAnswer, // Replace with actual correct answer if applicable
          score: question.score
        };
        return formattedQuestion;
      });

      console.log('Formatted Questions:', formattedQuestions);
    }
  }

  finishSchedule() {
    this.scrollToTop();
    this.messageComponent.showMessageAndStartProgress();

    // After a delay, navigate to the dashboard
    setTimeout(() => {
      this.router.navigate(['/sidebar']);
    }, 5000);
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
