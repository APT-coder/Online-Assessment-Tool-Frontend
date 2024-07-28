import { Component } from '@angular/core';
import { LiveCardComponent } from './components/live-card/live-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user/user.service';
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

  constructor(private userService: UserService) {}

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
  }
}
