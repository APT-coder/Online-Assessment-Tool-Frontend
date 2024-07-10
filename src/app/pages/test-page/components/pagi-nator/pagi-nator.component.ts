import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagi-nator',
  standalone: true,
  imports: [],
  templateUrl: './pagi-nator.component.html',
  styleUrl: './pagi-nator.component.scss'
})
export class PagiNatorComponent {
  
  @Input () questions: any;

  @Output() itemClicked = new EventEmitter<string>();

  handleClick(event: Event,item: string): void {
    event.preventDefault();
    this.itemClicked.emit(item);
  }

}
