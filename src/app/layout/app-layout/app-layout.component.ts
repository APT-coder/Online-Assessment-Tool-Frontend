import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../service/shared/shared.service';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {
  isSidebarCollapsed = true;

  constructor(private sharedService: SharedService) {}

  toggleSidebar(data: boolean) {
    this.isSidebarCollapsed = data;
  }
  
  handleIsScheduled(isScheduled: boolean) {
    this.sharedService.setIsScheduled(isScheduled);
  }
}
