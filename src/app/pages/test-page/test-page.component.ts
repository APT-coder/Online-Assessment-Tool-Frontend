import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListComponentsComponent } from './components/list-components/list-components.component';
import { PagiNatorComponent } from "./components/pagi-nator/pagi-nator.component";
import { QuestionService } from '../../service/assessment/question.service'; 
import { QuestionComponent } from './components/question/question.component';
import { ButtonActiveComponent } from '../../ui/buttons/button-active/button-active.component';

import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../../models/test.interface'; 
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TimerService } from '../../service/timer/timer.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-test-page',
    standalone: true,
    templateUrl: './test-page.component.html',
    styleUrl: './test-page.component.scss',
    providers: [],
    imports: [ListComponentsComponent, PagiNatorComponent, QuestionComponent,ButtonActiveComponent]
})
export class TestPageComponent implements OnInit, OnDestroy {

    todos:any=[];
    data:any;
    enteredAnswer: string | undefined;
    assessmentId: any;
    constructor(private router: Router, private api: QuestionService,private route: ActivatedRoute,private dialog: MatDialog,private timerService: TimerService){
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.data = navigation.extras.state['data'];
      }
    }


    public questions: any[] = [];
    public assessment: any;

    timer: number = 0;
    private timerSubscription:Subscription | undefined;

    count: number = 0;
    index:number=7;
    countTemp: number =0;

    user = JSON.parse(localStorage.getItem('userDetails') as string);
  
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

  handleButtonClick(event: { answer: string, index: number }) {

    if(event.index==7){
      this.question[this.count].questionstatus="unreviewed";
      console.log("from test page " ,event.index);
      this.question[this.count].selectedoption=-1;
      console.log(this.question);
      this.question[this.count].answered=event.answer;
    }
    else{
    // console.log('Button clicked in child component at index:', index);
    this.question[this.count].questionstatus="done";
    this.question[this.count].selectedoption=event.index;
    // console.log('Question index:', this.count+1);
    console.log(this.question);
    this.question[this.count].answered=event.answer;
    console.log("from test page " ,event.index);
    this.index=event.index;
    }
    
  }

  onReviewMarked(isMarked: boolean) {
    if(this.question[this.count].questionstatus=="marked"){
      this.question[this.count].questionstatus="unreviewed";
    }
    else{
      this.question[this.count].questionstatus="marked";
    }
    
  
    console.log("Checked");
  }

  handleAnswerEntered(answer: string): void {
    this.enteredAnswer = answer;
    if (this.enteredAnswer.trim() === '') {
      this.question[this.count].questionstatus = "unreviewed";
      console.log("unreviewed");
    } else {
      this.question[this.count].questionstatus = "done";
    }
  

    this.question[this.count].answered=this.enteredAnswer;
    console.log('Entered answer:', this.enteredAnswer);
  }
  

  

   
 

  
    ngOnInit(): void {
      this.assessmentId = this.route.snapshot.paramMap.get('id');
        // this.fetchQuestions();

        this.fetchAssessments();
      console.log(this.data.assessmentDuration);
      
        this.timerService.startTimer(this.data.assessmentDuration);
       this.timerSubscription = this.timerService.getTimer().subscribe(time => {
      this.timer = time;
      if (time <= 0) {
        this.onComplete();
      }
    });

      }

      ngOnDestroy(): void {
        this.timerService.stopTimer();
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
      }

      onComplete(): void {
       console.log("backend have to be called");
       
      }
      formatTime(seconds: number): string {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h, m, s].map(val => val < 10 ? `0${val}` : val).join(':');
      }
     
   
      question:any
      questionWithoutNumber:any
     
      fetchAssessments():void{
        this.api.getAssessment(this.assessmentId).subscribe(response =>{
          this.assessment= response;

          console.log(this.assessment.result);
          // console.log(this.assessment.result.assessmentDuration);
          
          
       

          this.questionWithoutNumber =this.addFieldsToQuestions(this.assessment.result.questions)
          console.log(this.questionWithoutNumber);

          this.addQuestionNumbers(this.questionWithoutNumber);
          console.log(this.questionWithoutNumber);
          this.question = this.questionWithoutNumber;

             
      });
      }

       addFieldsToQuestions(assessment:any):any{
        return assessment.map((question: any) => ({
          ...question,
          selectedoption: -1,
          answered: '',
          questionstatus: 'unreviewed'
        }));
      }

       addQuestionNumbers(questions: Question[]): void {
        questions.forEach((question, index) => {
          question['questionNo'] = index+1;
        });
      }
      
      postAssessment() {
        var userId = this.user.UserId;
      
        // this.api.postAssessment(this.question, userId).subscribe({
        //   next: (response) => {
        //     console.log('Assessment posted successfully:', response);
        //   },
        //   error: (error) => {
        //     console.error('Error posting assessment:', error);
        //   },
        //   complete: () => {
        //     console.log('Post assessment request completed');
        //   }
        // });

        console.log("NEED BACKEND CONNECTION DONE");
        ///MAIN
        console.log(this.question)
      }

      openConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '300px'
        });
    
        dialogRef.componentInstance.confirm.subscribe(() => {
          this.postAssessment();
        });
    
        dialogRef.afterClosed().subscribe(result => {
          
        });
      }


}


