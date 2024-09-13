import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../../ui/buttons/button-inactive/button-inactive.component';
import { ButtonPointsComponent } from '../../../../ui/buttons/button-points/button-points.component';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

interface Question {
  id: string;
  type: string;
  content: string;
  options?: string[];
  correctAnswer: string;
  score: number;
}

interface Assessment {
  id: string;
  name: string;
  scheduledBatchId: string;
  createdDate: string;
  questions: Question[];
}

@Component({
  selector: 'app-assessment-preview',
  standalone: true,
  imports: [SidebarComponent, ButtonActiveComponent, ButtonInactiveComponent, ButtonPointsComponent, CommonModule],
  templateUrl: './assessment-preview.component.html',
  styleUrl: './assessment-preview.component.scss'
})
export class AssessmentPreviewComponent {
    @Input() questions: any;
    selectedQuestions:any[]=[];
    @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();
    constructor(private route: ActivatedRoute) {}
    onEditClicked() {
      this.editClicked.emit();
    }
  isSidebarCollapsed: boolean = false;
    currentAssessment: Assessment | null = null;

    ngOnInit() {
        console.log(this.questions);
        this.route.queryParams.subscribe(params => {
          const questionsQuery = params['questions'];
          if (questionsQuery) {
            this.selectedQuestions = JSON.parse(decodeURIComponent(questionsQuery));
            console.log('Selected Questions:', this.selectedQuestions);
          } else {
            console.log('No query parameters found.');
          }
        });
      }
      
    onToggleSidebar(collapsed: boolean) {
        this.isSidebarCollapsed = collapsed;
      }
}
