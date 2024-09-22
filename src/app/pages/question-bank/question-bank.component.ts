import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { AssessmentOverview } from '../../shared/models/assessmentOverview.interface'; 
import { AdminDashboardService } from '../../service/admin-dashboard/admin-dashboard.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faPen } from '@fortawesome/free-solid-svg-icons';
import { QuestionService } from '../../service/assessment/question.service';
import { Router } from '@angular/router';
import { ButtonActiveComponent } from "../../ui/buttons/button-active/button-active.component";
import { Question } from '../../shared/models/question.interface'; 
import { AssessmentPreviewComponent } from '../create-test/components/assessment-preview/assessment-preview.component'; 

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [
    SidebarComponent,
    MultiSelectModule,
    FormsModule,
    TableModule,
    CommonModule,
    FontAwesomeModule,
    ButtonActiveComponent,
    AssessmentPreviewComponent
],
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {
  assessments!: AssessmentOverview[];
  faChevronDown = faChevronDown;
  faPen = faPen;
  selectedAssessments!: AssessmentOverview[];
  expandedAssessmentIds: Set<number> = new Set();
  assessmentDetails: { [key: number]: any } = {};
  selectedQuestions: Question[] = [];
  showPreview: boolean = false;
  constructor(
    private assessmentService: AdminDashboardService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchAssessments();
  }

  fetchAssessments(): void {
    this.assessmentService.getAllAssessmentOverviews().subscribe(
      (data) => {
        if (data && data.isSuccess) {
          this.assessments = data.result;
        } else {
          console.error('Failed to fetch assessments:', data?.message || 'Unknown error');
        }
      },
      (error) => {
        console.error('Error fetching assessments', error);
      }
    );
  }

  toggleRoleExpansion(assessmentId: number): void {
    if (this.expandedAssessmentIds.has(assessmentId)) {
      this.expandedAssessmentIds.delete(assessmentId);
    } else {
      this.fetchAssessmentDetails(assessmentId);
    }
  }

  fetchAssessmentDetails(assessmentId: number): void {
    this.questionService.getAssessment(assessmentId).subscribe(
      (response: any) => {
        if (response.isSuccess) {
          console.log(response.result);
          this.assessmentDetails[assessmentId] = response.result;
          this.expandedAssessmentIds.add(assessmentId);
        } else {
          console.error('Error fetching assessment details');
        }
      },
      (error) => {
        console.error('Error fetching assessment details', error);
      }
    );
  }
  toggleQuestionSelection(question: Question, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.checked !== undefined) {
      if (inputElement.checked) {
        this.selectedQuestions.push(question);
      } else {
        const index = this.selectedQuestions.findIndex(q => q.id === question.id);
        if (index > -1) {
          this.selectedQuestions.splice(index, 1);
        }
      }
    }
  }
  
  onNextClick(): void {
    const questionsQuery = encodeURIComponent(JSON.stringify(this.selectedQuestions));
  
  this.router.navigate(['/app/assessment-preview'], {
    queryParams: { questions: questionsQuery }
  });
  }
  
}
