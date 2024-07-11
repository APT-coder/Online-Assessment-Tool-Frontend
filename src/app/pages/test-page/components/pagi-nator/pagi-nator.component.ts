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

  handleClick(event: Event,item: string): void {
    event.preventDefault();
    this.itemClicked.emit(item);
    console.log('Selected question id',this.selectedQuestionId);


    
  }

}
