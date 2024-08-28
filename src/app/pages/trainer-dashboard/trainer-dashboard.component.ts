import { Component } from '@angular/core';
import { LiveCardComponent } from './components/live-card/live-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service'; 
import { BarGraphComponent } from "./components/bar-graph/bar-graph/bar-graph.component";

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [LiveCardComponent, SidebarComponent, TableDashboardComponent, PieDiagramComponent, CommonModule, BarGraphComponent],
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.scss'
})
export class TrainerDashboardComponent {
  isModalVisible = false;
  selectedAssessmentId!: number;
  selectedAssessmentStatus!:string;
  isDataAvailable: boolean = false;
  noDataMessage: string = 'Select the evaluated assessment to see the data';

  constructor(private authService: AuthService) {}

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('overlay');
  }

  onAssessmentSelected(Obj: any) {
    console.log(Obj);
    this.selectedAssessmentId = Obj.scheduledAssessmentId;
    console.log("Assmnt Id" + Obj.scheduledAssessmentId);
    this.selectedAssessmentStatus = Obj.status;
    console.log(Obj.status);
    if (!Obj.isEvaluated) {
      this.isDataAvailable = false;
      this.noDataMessage = 'No data available';
    } else {
      this.isDataAvailable = true;
    }
  }
}

