import { Component, Input } from '@angular/core';
import { ButtonActiveComponent } from '../../ui/buttons/button-active/button-active.component'; 
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TraineeStatusDTO } from '../../shared/models/TraineeStatusDTO.interface';
import { ScheduledAssessmentService } from '../../service/scheduled-assessment/scheduled-assessment.service'; 
import { TraineeAnswerDetailDTO } from '../../shared/models/TraineeAnswerDetailDTO.interface';
import { UpdateScoreDTO } from '../../shared/models/UpdateScoreDTO.interface'; 
import { forkJoin } from 'rxjs';
import { AssessmentTableDTO } from '../../shared/models/AssessmentTableDTO.interface'; 
import { AssessmentStatus } from '../../shared/models/AssessmentTableDTO.interface'; 
import { ActivatedRoute } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
    selector: 'app-assessment-evaluate',
    standalone: true,
    templateUrl: './assessment-evaluate.component.html',
    styleUrl: './assessment-evaluate.component.scss',
    imports: [ButtonActiveComponent, SidebarComponent,CommonModule,FormsModule,MessagesModule,
      MessageModule,ConfirmDialogModule, ToastModule, ButtonModule, ProgressBarModule ],
    providers:[ConfirmationService, MessageService]
    
})
export class AssessmentEvaluateComponent {

students: TraineeStatusDTO | any; 
absentStudents: TraineeStatusDTO|any;
selectedStudentResponses:any;
evaluatedStudentIds: Set<number> = new Set<number>();
scheduledAssessmentId:number=0;
scheduledAssessmentDetails: AssessmentTableDTO|any;

Title:string=""
totalTrainee:number=0;
selectedStudentId: any;
numberOfSubmittedTrainee: number=0;
numberOfAbsentTrainee:number=0;
updatedScores: UpdateScoreDTO[] = [];

isLoading: boolean = true; // Loading state

constructor(private scheduledAssessmentService: ScheduledAssessmentService,private messageService:MessageService,private confirmationService: ConfirmationService, private route: ActivatedRoute) { 
  this.route.paramMap.subscribe(params => {
    const paramId = params.get('scheduledAssessmentId');
    this.scheduledAssessmentId = paramId ? +paramId : 0; 
  });

  this.loadAttendedStudents(this.scheduledAssessmentId);
  this.loadAbsentStudents(this.scheduledAssessmentId);  
  this.loadStudentCount(this.scheduledAssessmentId);
  this.GetAssessmentName(this.scheduledAssessmentId);
}


ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const paramId = params.get('scheduledAssessmentId');
    this.scheduledAssessmentId = paramId ? +paramId : 0; 
  });
}
GetAssessmentName(scheduledAssessmentId:number):void{
  this.scheduledAssessmentService.fetchAssessmentName(scheduledAssessmentId).subscribe(data => {
    this.scheduledAssessmentDetails = data;
    this.Title=this.scheduledAssessmentDetails.assessmentName;
  });
}

loadAttendedStudents(scheduledAssessmentId: number): void {
  this.scheduledAssessmentService.getAttendedStudents(scheduledAssessmentId)
    .subscribe((data) => {
      this.students = data;
      const numberOfSubmittedTrainee = this.students.length;
      this.numberOfSubmittedTrainee=numberOfSubmittedTrainee;
      this.onStudentClick(1);
    });
}

loadAbsentStudents(scheduledAssessmentId: number): void {
  this.scheduledAssessmentService.getAbsentStudents(scheduledAssessmentId)
    .subscribe(data => {
      this.absentStudents = data;
      const numberOfAbsentTrainee = this.absentStudents.length;
      this.numberOfAbsentTrainee=numberOfAbsentTrainee;
    });
}

loadStudentCount(scheduledAssessmentId: number): void {
  this.scheduledAssessmentService.getStudentCountByAssessment(scheduledAssessmentId)
    .subscribe(data => {
      this.totalTrainee = data;
    });
}


// onStudentClick(traineeId: number): void {
//   this.isLoading = true; // Start loading state
//   this.selectedStudentId = traineeId;

//   this.scheduledAssessmentService.getTraineeAnswerDetails(traineeId, this.scheduledAssessmentId)
//     .subscribe({
//       next: (data) => {
//         // Ensure data.result is an array and map it to the expected format
//         this.selectedStudentResponses = data.result.map((response: TraineeAnswerDetailDTO) => {
//           console.log('Raw Response:', response);

//           // Adapt the response to match the expected structure
//           let optionsArray: string[] = [];
//           let correctAnswer: string = '';

//           if (response.questionOptions) {
//             optionsArray = response.questionOptions['options'] || []; // Adjust to match the field names
//             correctAnswer = response.questionOptions['correctAnswers'].join(', ') || ''; // Join correctAnswers if needed
//           } else {
//             console.warn('questionOptions is missing or malformed:', response.questionOptions);
//           }

//           return {
//             ...response,
//             questionOptions: {
//               Options: optionsArray, // Assign the options array
//               correctAnswer: correctAnswer // Handle multiple correct answers if necessary
//             }
//           };
//         });

//         console.log('Processed Student Responses:', this.selectedStudentResponses);
//         this.isLoading = false; // Stop loading state
//       },
//       error: (error) => {
//         console.error('Error fetching trainee answers:', error);
//         this.isLoading = false; // Stop loading state on error
//       }
//     });
// }

onStudentClick(traineeId: number): void {
  this.isLoading = true;
  this.selectedStudentId = traineeId;

  this.scheduledAssessmentService.getTraineeAnswerDetails(traineeId, this.scheduledAssessmentId)
    .subscribe({
      next: (data) => {
        this.selectedStudentResponses = data.result.map((response: TraineeAnswerDetailDTO) => {

          let optionsArray: string[] = [];
          let correctAnswer: string | string[] = [];

          if (response.questionOptions) {
            optionsArray = response.questionOptions['options'] || [];
            
            // Determine if the question is MCQ or MSQ and set the correct answer accordingly
            if (response.questionType === 'mcq') {
              // MCQ: correctAnswer should be a single value
              correctAnswer = response.questionOptions['correctAnswers']?.[0] || '';
            } else if (response.questionType === 'msq') {
              // MSQ: correctAnswer should be an array of values
              correctAnswer = response.questionOptions['correctAnswers'] || [];
            } else {
              console.warn('Unknown question type:', response.questionType);
            }
          } else {
            console.warn('questionOptions is missing or malformed:', response.questionOptions);
          }

          return {
            ...response,
            questionOptions: {
              Options: optionsArray,
              correctAnswer: correctAnswer
            }
          };
        });

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching trainee answers:', error);
        this.isLoading = false;
      }
    });
}





onScoreChange(questionId: number, newScore: number): void {
  const assessmentId = this.scheduledAssessmentId;
  const traineeId = this.selectedStudentId;
  

  const index = this.updatedScores.findIndex(score => score.questionId === questionId && score.traineeId === traineeId);
  if (index !== -1) {
    this.updatedScores[index].score = newScore;
  } else {
    this.updatedScores.push({
      scheduledAssessmentId: assessmentId,
      traineeId: traineeId,
      questionId: questionId,
      score: newScore
    });
  }
}


saveScores(): void {
  const traineeId = this.selectedStudentId;
  this.evaluatedStudentIds.add(traineeId);

  const updateRequests = this.updatedScores.filter(scoreUpdate => scoreUpdate.traineeId === traineeId).map(scoreUpdate =>
    this.scheduledAssessmentService.updateScores(scoreUpdate)
  );


  forkJoin(updateRequests).subscribe({
    next: responses => {
      this.onStudentClick(traineeId);
      this.updateScore(this.selectedStudentResponses);
    },
    error: error => {
      console.error('Error updating scores', error);
    }
  });
}

submitScores(): void {
  // Collect scores for all students
  const updateRequests = this.students.map((student: TraineeStatusDTO) => 
    this.scheduledAssessmentService.updateTotalScores(student.score, student.traineeId, this.scheduledAssessmentId)
  );

  // Execute all update requests
  forkJoin(updateRequests).subscribe({
    next: responses => {
      console.log('All scores submitted successfully',responses);
      this.updateAssessmentStatus();
      
    },
    error: error => {
      console.error('Error submitting scores', error);
    }
  });
}

updateAssessmentStatus(): void {
  this.scheduledAssessmentService.updateScheduledAssessmentStatus(
    this.scheduledAssessmentId, 
    AssessmentStatus.Evaluated // Set status to Evaluated
  ).subscribe({
    next: statusResponse => {
      console.log('Status updated successfully', statusResponse);
    },
    error: statusError => {
      console.error('Error updating status', statusError);
    }
  });
}

updateScore(selectedStudentResponses: any) {
  var newScore = 0;
  selectedStudentResponses.forEach((element: any) => {
    newScore += element.score;
  });

  var selectedStudent = this.students.find((student: any) => student.traineeId === this.selectedStudentId);
  if (selectedStudent) {
    selectedStudent.score = newScore;
  }
}


confirm() {
  this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      acceptIcon: 'pi pi-check mr-2 ',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm m-2',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm m-2',
      accept: () => {
        this.submitScores();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Updated assessment scores successfully', life: 3000 });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: 'Scores not published', life: 3000 });
      }
  });
}
}
