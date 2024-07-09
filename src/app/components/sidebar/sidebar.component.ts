import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUpload, faBell, faCog,faPlus,faChevronLeft, faChevronRight,faUserCog  } from '@fortawesome/free-solid-svg-icons';
import { FileUploadComponent } from '../../pages/assessment/modals/file-upload/file-upload.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule, FileUploadComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('collapse', [
      state('expanded', style({ width: '250px' })),
      state('collapsed', style({ width: '80px' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent {
  faHome = faHome;
  faPlus = faPlus;
  faUpload = faUpload;
  faBell = faBell;
  faCog = faCog;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight ;
  faUserCog = faUserCog;

  @Output() toggle = new EventEmitter<boolean>(); 

  isAdmin = false;
  isCollapsed: boolean = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed); 
  }
  constructor() {
    this.checkUserRole();
  }
  checkUserRole() {
    const userRole = 'admin'; 
    this.isAdmin = userRole === 'admin';
  }
}
