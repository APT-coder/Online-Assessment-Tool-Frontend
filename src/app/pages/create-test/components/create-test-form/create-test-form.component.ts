import { Component, HostListener, ViewChild } from '@angular/core';
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
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AssessmentPreviewComponent } from "../../../assessment/components/assessment-preview/assessment-preview.component";

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
    MatIcon,
    FormsModule,
    AssessmentPreviewComponent
],
  templateUrl: './create-test-form.component.html',
  styleUrls: ['./create-test-form.component.scss']
})
export class CreateTestFormComponent {
  @ViewChild('stepper')
  stepper!: MatStepper;

  showScrollToTopButton = false;
  showScrollToBottomButton = true;

  questions: { id: number, type: string, score: number, data?: any }[] = [{ id: 1, type: '', score: 0 }];

  onQuestionTypeSelected(questionType: string, index: number) {
    this.questions[index].type = questionType;
  }

  addNewQuestion() {
    const newQuestionId = this.questions.length + 1;
    this.questions.push({ id: newQuestionId, type: '', score: 0 });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  onMcqData(data: any, index: number) {
    this.questions[index].data = data;
  }

  logQuestions() {
    const currentStepIndex = this.stepper.selectedIndex;
    if (currentStepIndex === 1) {
      const formattedQuestions = this.questions.map(question => {
        let formattedQuestion = {
          id: question.id,
          type: question.type,
          content: '',
          options: question.data?.options,
          correctAnswer: question.data?.correctAnswer, 
          score: question.score
        };
        return formattedQuestion;
      });

      console.log('Formatted Questions:', formattedQuestions);
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
