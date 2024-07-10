import { Component } from '@angular/core';
import { ListComponentsComponent } from './components/list-components/list-components.component';
import { PagiNatorComponent } from "./components/pagi-nator/pagi-nator.component";
import { QuestionService } from '../../service/questions/question.service';
import { QuestionComponent } from "./components/question/question.component";

@Component({
    selector: 'app-test-page',
    standalone: true,
    templateUrl: './test-page.component.html',
    styleUrl: './test-page.component.scss',
    providers: [],
    imports: [ListComponentsComponent, PagiNatorComponent, QuestionComponent]
})
export class TestPageComponent {

    todos:any=[];
    constructor(private api: QuestionService) {}
    public questions: any[] = [];

    count: number = 0;
    countTemp: number =0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

    
  onItemClicked(item: string): void {
    this.countTemp = (Number(item));
    this.count=--this.countTemp;

  }

  
    ngOnInit(): void {
        this.api.getJSON()
          .subscribe(response => {
            this.questions =response.questions;
            console.log(this.questions);
            const questionLength = this.questions.length
          });
      }
}
