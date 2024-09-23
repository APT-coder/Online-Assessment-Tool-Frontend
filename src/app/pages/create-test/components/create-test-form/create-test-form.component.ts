import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDropdownComponent } from '../question-dropdown/question-dropdown.component';
import { McqFormComponent } from '../mcq-form/mcq-form.component';
import { DescriptiveFormComponent } from '../descriptive-form/descriptive-form.component';
import { FillInTheBlanksFormComponent } from '../fill-in-the-blanks-form/fill-in-the-blanks-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface Option {
  option: string;
  isCorrect: boolean;
}

interface questions { id: number, type: string, score: number, content: string, options: Option[], correctAnswer: string[] } 


@Component({
  selector: 'app-create-test-form',
  standalone: true,
  imports: [
    CommonModule,
    QuestionDropdownComponent,
    McqFormComponent,
    DescriptiveFormComponent,
    FillInTheBlanksFormComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './create-test-form.component.html',
  styleUrls: ['./create-test-form.component.scss']
})
export class CreateTestFormComponent implements OnInit {
  questions: questions[] = [{ id: 1, type: '', score: 0, content: '', options: [], correctAnswer: [] }];
  @Output() questionsChange: EventEmitter<questions[]> = new EventEmitter<questions[]>();

  ngOnInit(): void {
    
  }

  onQuestionTypeSelected(questionType: string, index: number) {
    this.questions[index].type = questionType;
    this.questionsChange.emit(this.questions);
  }

  addNewQuestion() {
    const newQuestionId = this.questions.length + 1;
    this.questions.push({ id: 1, type: '', score: 0, content: '', options: [], correctAnswer: [] });
    this.questionsChange.emit(this.questions);
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
    this.questionsChange.emit(this.questions);
  }

  onMcqData(data: any, index: number) {
    this.questions[index].content = data.question;
    const correctChoices = data.options
        .filter((option: Option) => option.isCorrect)
        .map((option: Option) => option.option);
    this.questions[index].correctAnswer = correctChoices;    
    this.questions[index].options = data.options.map((option: Option) => option.option);
    this.questionsChange.emit(this.questions);
  }

  onDescData(data: any, index: number) {
    this.questions[index].content = data.question;
    this.questions[index].correctAnswer = [data.answer];
    this.questionsChange.emit(this.questions);
  }

  onFillData(data: any, index: number) {
    this.questions[index].content = data.question;
    this.questions[index].correctAnswer = [data.answer];
    this.questionsChange.emit(this.questions);
  }
}
