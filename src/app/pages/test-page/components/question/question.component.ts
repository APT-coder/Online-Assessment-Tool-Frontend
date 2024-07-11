import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {

  @Input() question:any;
  @Input() questionNumber:number=1;
  @Input() totalQuestion:number=0;
}
