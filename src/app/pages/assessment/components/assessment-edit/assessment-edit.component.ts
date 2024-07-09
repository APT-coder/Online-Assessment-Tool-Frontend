import { Component, Input } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../../ui/buttons/button-inactive/button-inactive.component';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: string;
  type: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  score: number;
}

interface Assessment {
  id: string;
  name: string;
  scheduledBatchId: string;
  createdDate: string;
  questions: Question[];
}

@Component({
  selector: 'app-assessment-edit',
  standalone: true,
  imports: [ButtonActiveComponent, ButtonInactiveComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './assessment-edit.component.html',
  styleUrls: ['./assessment-edit.component.scss']
})
export class AssessmentEditComponent {
  @Input() questions: Question[] = [];
  isSidebarCollapsed: boolean = false;
  currentAssessment: Assessment | null = null;

  ngOnInit() {
    
  }

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  addOption(questionIndex: number) {
    const question = this.questions[questionIndex];
    if (!question.options) {
      question.options = [];
    }
    question.options.push('');
  }

  addQuestion() {
    this.questions.push({
      id: '',
      type: 'mcq',
      content: '',
      options: [''],
      correctAnswer: '',
      score: 0
    });
  }

  setCorrectAnswer(question: Question, option: string) {
    question.correctAnswer = option;
  }
}
