import { Component } from '@angular/core';
import { ListComponentsComponent } from './components/list-components/list-components.component';
import { PagiNatorComponent } from "./components/pagi-nator/pagi-nator.component";
import { QuestionService } from '../../service/questions/question.service';
import { QuestionComponent } from './components/question/question.component';
import { ButtonActiveComponent } from '../../ui/buttons/button-active/button-active.component';
import { Question } from '../../service/questions/question';

@Component({
    selector: 'app-test-page',
    standalone: true,
    templateUrl: './test-page.component.html',
    styleUrl: './test-page.component.scss',
    providers: [],
    imports: [ListComponentsComponent, PagiNatorComponent, QuestionComponent,ButtonActiveComponent]
})
export class TestPageComponent {

    todos:any=[];
    constructor(private api: QuestionService) {}
    public questions: any[] = [];

    count: number = 0;
    index:number=7;
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

  handleButtonClick(index: number) {

    if(index==7){
      this.questions[this.count].questionstatus="unreviewed";
      console.log(this.questions);
      this.questions[this.count].selectedoption=-1;
    }
    else{
    console.log('Button clicked in child component at index:', index);
    this.questions[this.count].questionstatus="done";
    this.questions[this.count].selectedoption=index;
    // console.log('Question index:', this.count+1);
    console.log(this.questions);
    this.index=index;
    }
    // Your logic here
  }

  onReviewMarked(isMarked: boolean) {
    if(this.questions[this.count].questionstatus=="marked"){
      this.questions[this.count].questionstatus="unreviewed";
    }
    else{
      this.questions[this.count].questionstatus="marked";
    }
    
    // Handle the event here
    console.log("Checked");
  }

  
  
    ngOnInit(): void {
        // this.api.getJSON()
        //   .subscribe(response => {
        //     this.questions =response.questions;
        //     console.log(this.questions);
        //     const questionLength = this.questions.length
        //   });

        this.fetchQuestions();
      }


      fetchQuestions(): void {
        this.api.getQuestions().subscribe(response => {
              // this.questions =response.questions;
              // console.log(response);
              this.questions =response;
              console.log(this.questions);
              // const questionLength = this.questions.length
            });
          }
}
