import { Component, Input } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component'; 
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { TraineeStatusDTO } from '../../../../../models/TraineeStatusDTO.interface'; 
import { ScheduledAssessmentService } from '../../../../service/scheduled-assessment/scheduled-assessment.service'; 
import { TraineeAnswerDetailDTO } from '../../../../../models/TraineeAnswerDetailDTO.interface'; 
import { UpdateScoreDTO } from '../../../../../models/UpdateScoreDTO.interface'; 
import { forkJoin } from 'rxjs';

interface Question {
  id: string;
  type: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  score: number;
  learnerResponse: string;
}

@Component({
    selector: 'app-assessment-evaluate',
    standalone: true,
    templateUrl: './assessment-evaluate.component.html',
    styleUrl: './assessment-evaluate.component.scss',
    imports: [ButtonActiveComponent, SidebarComponent,CommonModule,FormsModule ]
    
})
export class AssessmentEvaluateComponent {

  students: TraineeStatusDTO | any; 
  absentStudents: TraineeStatusDTO|any;
  selectedStudentResponses:any;
  evaluatedStudentIds: Set<number> = new Set<number>();
  scheduledAssessmentId:number=2;


  Title:string="OOPs Assessment"
  totalTrainee:number=0;
  selectedStudentId: any;
  numberOfSubmittedTrainee: number=0;
  numberOfAbsentTrainee:number=0;
  updatedScores: UpdateScoreDTO[] = [];

  constructor(private scheduledAssessmentService: ScheduledAssessmentService) { 
    this.loadAttendedStudents(this.scheduledAssessmentId);
    this.loadAbsentStudents(this.scheduledAssessmentId);  
    this.loadStudentCount(this.scheduledAssessmentId);
  }


  ngOnInit(): void {

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


  onStudentClick(traineeId: number): void {
    console.log('Clicked trainee ID:', traineeId); 
    this.selectedStudentId = traineeId; // Update the selected student ID
    this.scheduledAssessmentService.getTraineeAnswerDetails(traineeId,2)
      .subscribe( data => {
        this.selectedStudentResponses = data.result;
        
      });
  }

  onScoreChange(questionId: number, newScore: number): void {
    const assessmentId = 2;
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
  console.log(this.updatedScores);
  const traineeId = this.selectedStudentId;
  this.evaluatedStudentIds.add(traineeId);

  const updateRequests = this.updatedScores.filter(scoreUpdate => scoreUpdate.traineeId === traineeId).map(scoreUpdate =>
    this.scheduledAssessmentService.updateScores(scoreUpdate)
  );

  console.log("inside savescores", updateRequests);

  forkJoin(updateRequests).subscribe({
    next: responses => {
      this.onStudentClick(traineeId);
      this.updateScore(this.selectedStudentResponses);

      console.log('Scores updated successfully', responses);
      console.log('Evaluated Student IDs:', Array.from(this.evaluatedStudentIds));
    },
    error: error => {
      console.error('Error updating scores', error);
    }
  });
}

submitScores(): void {
  const updateRequests = this.students.map((student: TraineeStatusDTO) => 
    this.scheduledAssessmentService.updateTotalScores(student.score, student.traineeId, this.scheduledAssessmentId)
  );

  forkJoin(updateRequests).subscribe({
    next: responses => {
      console.log('All scores submitted successfully', responses);
    },
    error: error => {
      console.error('Error submitting scores', error);
    }
  });
}

updateScore(selectedStudentResponses: any) {
  console.log(selectedStudentResponses);
  var newScore = 0;
  selectedStudentResponses.forEach((element: any) => {
    newScore += element.score;
  });
  console.log(newScore);

  var selectedStudent = this.students.find((student: any) => student.traineeId === this.selectedStudentId);
  if (selectedStudent) {
    selectedStudent.score = newScore;
  }
  console.log(this.students);
  }
  getIconClass(status: string): string {
    return status === 'present' ? 'fas fa-check-circle' : 'fas fa-times-circle';
  }
}
