import { Component } from '@angular/core';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ScheduledService } from '../../service/scheduled-assessment/scheduled.service';
import { AttendedTestsComponent } from './components/attended-tests/attended-tests.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-trainee-dashboard',
  standalone: true,
  imports: [ReminderComponent, AttendedTestsComponent, SidebarComponent],
  templateUrl: './trainee-dashboard.component.html',
  styleUrl: './trainee-dashboard.component.scss',
})
export class TraineeDashboardComponent {
  selected: string = 'scheduled';

  handleClick(buttonType: string) {
    this.selected = buttonType;
    console.log(buttonType);
  }

  user = JSON.parse(localStorage.getItem('userDetails') as string);
  firstname: string = this.getFirstName(this.user.UserName);
  scheduled: any[] | undefined;

  constructor(private api: ScheduledService) {}

  ngOnInit(): void {
    this.fetchScheduled();
    console.log(this.user);
  }

  fetchScheduled(): void {
    this.api.getScheduled(this.user.UserId).subscribe((response) => {
      this.scheduled = response;
      console.log(this.scheduled);
    });
  }
  
  getFirstName(userName: string): string {
    return userName.split(' ')[0];
  }
}
