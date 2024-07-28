import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
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
export class ListComponentsComponent {
  @Input() questions: any;
  @Input() questionType: any;
  @Input() questionNumber:any;
  @Input() selectedOption:any;
  @Input() fullQuestions:any;
  @Input() isChecked: any = false;
  @Output() answerEntered = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {}

  enteredAnswer: string = '';

  onTextareaChange(): void {
    this.answerEntered.emit(this.fullQuestions.answered);
    this.enteredAnswer="";
    // this.buttonClicked.emit();
   
  }
 

  @Output() buttonClicked = new EventEmitter<{ answer: string, index: number }>();
  @Output() reviewMarked = new EventEmitter<boolean>();

  option: any;
  clickedIndex: number | null = null;
  inputValue: string = '';

  handleClick( answer: string,i:number) {
    if (this.clickedIndex === i) {
      this.clickedIndex = null;
      this.buttonClicked.emit({ answer: '', index: 7 });
    } else {
      this.clickedIndex = i;
      this.buttonClicked.emit({ answer: answer, index: i });
    }
    this.cdr.detectChanges();
    // this.buttonClicked.emit(this.selectedOption);
    // console.log(i);
    console.log(answer);
  }

  onCheckboxChange(event: Event) {
    console.log(this.isChecked);
    
    const inputElement = event.target as HTMLInputElement;
    this.reviewMarked.emit(inputElement.checked);
  }

}
