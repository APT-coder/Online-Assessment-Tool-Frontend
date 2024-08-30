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
  sidebarToggled: boolean = false;

  constructor(private sharedService: SharedService) {}

  onSidebarToggled(collapsed: boolean) {
    this.sidebarToggled = collapsed;
  }

  handleIsScheduled(isScheduled: boolean) {
    this.sharedService.setIsScheduled(isScheduled);
  }
}
