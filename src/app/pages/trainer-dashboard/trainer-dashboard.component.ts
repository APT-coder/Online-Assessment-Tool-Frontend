import { Component } from '@angular/core';
import { LiveCardComponent } from './components/live-card/live-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [LiveCardComponent, SidebarComponent, TableDashboardComponent, PieDiagramComponent, CommonModule],
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.scss'
})
export class TrainerDashboardComponent {
  isModalVisible = false;

  constructor(private userService : UserService) { }

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('overlay');
  }
}
