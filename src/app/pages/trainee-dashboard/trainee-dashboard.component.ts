import { Component } from '@angular/core';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ScheduledService } from '../../service/scheduled-assessment/scheduled.service';
import { AttendedTestsComponent } from './components/attended-tests/attended-tests.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SharedService } from '../../service/shared/shared.service';

@Component({
  selector: 'app-trainee-dashboard',
  standalone: true,
  imports: [ReminderComponent, AttendedTestsComponent, SidebarComponent],
  templateUrl: './trainee-dashboard.component.html',
  styleUrl: './trainee-dashboard.component.scss',
})
export class TraineeDashboardComponent {

  isScheduled:boolean=true;
  selected: string = 'scheduled';

  handleClick(buttonType: string) {
    this.selected = buttonType;
    console.log(buttonType);
  }

  user = JSON.parse(localStorage.getItem('userDetails') as string);
  firstname: string = this.getFirstName(this.user.UserName);
  scheduled: any[] | undefined;

  constructor(private api: ScheduledService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.isScheduled$.subscribe(isScheduled => {
      this.isScheduled = isScheduled;
      console.log('Is Scheduled:', isScheduled);
    });

    this.fetchScheduled();
    console.log(this.user);
  }

  fetchScheduled(): void {
    this.api.getScheduled(this.user.TraineeId).subscribe((response) => {
      this.scheduled = response;
      console.log(this.scheduled);
    });
  }
  
  getFirstName(userName: string): string {
    return userName.split(' ')[0];
  }
}
