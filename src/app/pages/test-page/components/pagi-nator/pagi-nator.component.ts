import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagi-nator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagi-nator.component.html',
  styleUrl: './pagi-nator.component.scss'
})
export class PagiNatorComponent {
  
  @Input () questions: any;
  @Input() selectedQuestionId: number | null = null;
  @Output() itemClicked = new EventEmitter<string>();
  @Input() questionNo : any;
  
  currentPage: number = 1;
  questionsPerPage: number = 10;

  handleClick(event: Event,item: string): void {
    event.preventDefault();
    this.itemClicked.emit(item);
    // console.log('Selected question id',this.selectedQuestionId); 
  }

  get paginatedQuestions() {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    return this.questions.slice(startIndex, startIndex + this.questionsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.questions.length / this.questionsPerPage)) {
      this.currentPage++;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.questions.length / this.questionsPerPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  trackByQuestionNo(index: number, question: any): number {
    return question.questionno;
  }

  ngOnInit(): void {
        console.log(this.questions);
    }
}
