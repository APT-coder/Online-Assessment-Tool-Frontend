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
  inputValue: string = '';

  @Output() buttonClicked = new EventEmitter<number>();

  option: any;
  clickedIndex: number | null = null;


  handleClick(option: string, index: number,i:number) {
    if (this.clickedIndex === i) {
      this.clickedIndex = null;
      this.buttonClicked.emit(7);
    } else {
      this.clickedIndex = i;
      this.buttonClicked.emit(index);
    }

    
    // this event should go to change the color in the paginator for successfull color marking

  }


}
