import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-components',
  standalone: true,
  templateUrl: './list-components.component.html',
  styleUrl: './list-components.component.scss',
  imports: [CommonModule, FormsModule],
})
export class ListComponentsComponent {
  @Input() questions: any;
  @Input() questionType: any;
  @Input() questionNumber:any;
  @Input() selectedOption:any;
  @Input() fullQuestions:any;
  @Input() isChecked: any = false;
 

  @Output() buttonClicked = new EventEmitter<number>();
  @Output() reviewMarked = new EventEmitter<boolean>();

  option: any;
  clickedIndex: number | null = null;
  inputValue: string = '';

  handleClick(option: string, index: number,i:number) {
    if (this.clickedIndex === i) {
      this.clickedIndex = null;
      this.buttonClicked.emit(7);
    } else {
      this.clickedIndex = i;
      this.buttonClicked.emit(i);
    }
  }

  onCheckboxChange(event: Event) {
    console.log(this.isChecked);
    
    const inputElement = event.target as HTMLInputElement;
    this.reviewMarked.emit(inputElement.checked);
  }


}
