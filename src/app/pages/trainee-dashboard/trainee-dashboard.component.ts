import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";



import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReminderComponent } from "./components/reminder/reminder.component";
import { ScheduledService } from '../../service/scheduled-assessments/scheduled.service';


@Component({
  selector: 'app-trainee-dashboard',
  standalone: true,
  imports: [SidebarComponent, SideBarComponent, ReminderComponent],
  
  // imports: [MatListModule,BrowserModule,BrowserAnimationsModule,MatTableModule,MatButtonModule,MatSidenavModule],
  templateUrl: './trainee-dashboard.component.html',
  styleUrl: './trainee-dashboard.component.scss'
})
export class TraineeDashboardComponent {
  scheduled: any[] | undefined;

  constructor(private api: ScheduledService) {}

  ngOnInit(): void {
   
    this.fetchScheduled();
  }
  
  fetchScheduled(): void {
    this.api.getScheduled(2).subscribe(response => {
          this.scheduled =response;
          console.log(this.scheduled);
        });
      }



}
