import { Component, EventEmitter, Input, Output, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipePipe } from "../../../../pipes/optionsFilter/pipe.pipe";



@Component({
  selector: 'app-list-components',
  standalone: true,
  templateUrl: './list-components.component.html',
  styleUrl: './list-components.component.scss',
  imports: [CommonModule, FormsModule, PipePipe],
})
export class ListComponentsComponent implements AfterViewInit ,OnChanges {

  @ViewChildren('optionBox') optionBoxes!: QueryList<ElementRef>;
  @Input() questions: any;
  @Input() questionType: any;
  @Input() questionNumber:any;
  @Input() selectedOption:any;
  @Input() fullQuestions:any;
  @Input() isChecked: any = false;
  @Output() answerEntered = new EventEmitter<string>();
  @Output() buttonClicked = new EventEmitter<{ answer: string, index: number }>();
  @Output() reviewMarked = new EventEmitter<boolean>();
  option: any;
  clickedIndex: number | null = null;
  inputValue: string = '';
  
  enteredAnswer: string = '';
  selectedOptions: number[] = [];

  selectedOptionsState: { [key: number]: number[] } = {};
  currentQuestionIndex: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  performAction() {
    setTimeout(() => {
      this.setOptionBoxSizes();
    }, 10);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions']) {
      this.currentQuestionIndex = this.questionNumber;

      // Initialize or reset selected options for the current question
      if (!this.selectedOptionsState[this.currentQuestionIndex]) {
        this.selectedOptionsState[this.currentQuestionIndex] = [];
      }

      // Load the selected options for the current question
      this.selectedOptions = this.selectedOptionsState[this.currentQuestionIndex];
      
      // Call your function here if needed to handle new data
      this.handleDataChange(changes['questions'].currentValue);
    }
  }


  handleDataChange(newData: any): void {
    // this.setOptionBoxSizes();
  };

  ngAfterViewInit(): void {
    this.setOptionBoxSizes();
  }

  setOptionBoxSizes(): void {
    let maxWidth = 0;
    let maxHeight = 0;

    this.optionBoxes.forEach((box) => {
      const rect = box.nativeElement.getBoundingClientRect();
      if (rect.width > maxWidth) {
        maxWidth = rect.width;
      }
      if (rect.height > maxHeight) {
        maxHeight = rect.height;
      }
    });

    this.optionBoxes.forEach((box) => {
      box.nativeElement.style.width = `${maxWidth}px`;
      box.nativeElement.style.height = `${maxHeight}px`;
    });
  }



  onTextareaChange(): void {
    this.answerEntered.emit(this.fullQuestions.answered);
    this.enteredAnswer="";
    // this.buttonClicked.emit();
  }
 

 

  handleClick( answer: string,i:number) {
    if (this.clickedIndex === i) {
      this.clickedIndex = null;
      this.buttonClicked.emit({ answer: '', index: 7 });
    } else {
      this.clickedIndex = i;
      this.buttonClicked.emit({ answer: answer, index: i });
    }
    this.cdr.detectChanges();
  }

  handleMultipleClick(answer: string, i: number): void {
    const index = this.selectedOptions.indexOf(i);

    if (index === -1) {
      // Option not yet selected, add it
      this.selectedOptions.push(i);
    } else {
      // Option already selected, remove it
      this.selectedOptions.splice(index, 1);
    }

    this.selectedOptionsState[this.currentQuestionIndex] = [...this.selectedOptions];

    // Emit all selected answers
    const selectedAnswers = this.selectedOptions.map(idx => this.fullQuestions.questionOptions[0].options[idx]);
    this.buttonClicked.emit({ answer: selectedAnswers.join(','), index: i });

    this.cdr.detectChanges();
  }


  onCheckboxChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.reviewMarked.emit(inputElement.checked);
  }
  
 
}
