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
  
  enteredAnswer: string = ''

  constructor(private cdr: ChangeDetectorRef) {}

  performAction() {
    console.log('Action performed in Child2');
    setTimeout(() => {
      this.setOptionBoxSizes();
    }, 10);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questions']) {
      // The inputData property has changed, call your function here
      this.handleDataChange(changes['questions'].currentValue);
    }
  }


  handleDataChange(newData: any): void {
    // this.setOptionBoxSizes();
  };

  ngAfterViewInit(): void {
    
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
    console.log("from setOptionboxes",maxHeight);
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
    // this.buttonClicked.emit(this.selectedOption);
    // console.log(i);
    console.log(answer);
    // this.setOptionBoxSizes();
  }


  onCheckboxChange(event: Event) {
    console.log(this.isChecked);
    const inputElement = event.target as HTMLInputElement;
    this.reviewMarked.emit(inputElement.checked);
  }
  
 
}
