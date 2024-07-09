import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CreateTestFormComponent } from './components/create-test-form/create-test-form.component';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [SidebarComponent, CreateTestFormComponent],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.scss'
})
export class CreateTestComponent {
  isSidebarCollapsed: boolean = false;

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
