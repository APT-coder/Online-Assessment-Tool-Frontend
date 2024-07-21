import { Component } from '@angular/core';
import { LiveCardComponent } from './components/live-card/live-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TableDashboardComponent } from './components/table-dashboard/table-dashboard.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';
import { ProfileModalComponent } from '../../components/profile-modal/profile-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: true,
  imports: [LiveCardComponent, SidebarComponent, TableDashboardComponent, PieDiagramComponent, ProfileCardComponent, ProfileModalComponent, CommonModule],
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.scss'
})
export class TrainerDashboardComponent {
  isModalVisible = false;
  userId: number = 1;
  userDetail = {name: '', image: '', role: '', course: '' };

  constructor() { }

  showModal() {
    this.isModalVisible = true;
    document.body.classList.add('overlay');
  }
}
