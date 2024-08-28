import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service'; 
import { ScheduledAssessmentService } from '../../service/scheduled-assessment/scheduled-assessment.service';
import { ScheduledService } from '../../service/scheduled-assessment/scheduled.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ilp-integration-traineeattendtest',
  standalone: true,
  imports: [ProgressSpinnerModule, CommonModule],
  templateUrl: './ilp-integration-traineeattendtest.component.html',
  styleUrl: './ilp-integration-traineeattendtest.component.scss'
})
export class IlpIntegrationTraineeattendtestComponent implements OnInit {
  id: string = "";
  token: string ="";
  userRoleData: any;
  scheduledAssessmentDetails: any;
  assessmentPayload: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private authService : AuthService, 
    private scheduledAssessmentService : ScheduledAssessmentService,
    private scheduledService : ScheduledService
    ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.initializeUserRoleAndRoute();
  }

  ngOnInit(): void {
    
  }

  async initializeUserRoleAndRoute(): Promise<void> {
    try {
      this.userRoleData = await this.getUserRole();
      console.log(this.userRoleData);
      this.getBatchAndValidateUser();
    }catch (error) {
      console.error('Error fetching user role data:', error);
    }
  }
  
  getUserRole(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getUserRole(this.token).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getBatchAndValidateUser() {
    this.scheduledAssessmentService.fetchAssessmentName(parseInt(this.id))
    .subscribe((data) => {
      this.scheduledAssessmentDetails = data;
      console.log(this.scheduledAssessmentDetails);
      this.validateUser();
    });
  }

  validateUser(): void {
    const batchName = this.scheduledAssessmentDetails.batchName;
    if (batchName) {
      const userBatchName: string = this.userRoleData.UserBatch.batchname;
      
      if (userBatchName.toLowerCase() === batchName.toLowerCase()) {
        console.log("User validated successfully", userBatchName, batchName);
        localStorage.removeItem('userDetails');
        localStorage.setItem('userDetails', JSON.stringify(this.userRoleData));

        this.scheduledService.getScheduled(this.userRoleData.TraineeId)
        .subscribe((data) => {
          this.assessmentPayload = data.filter(d => d.assessmentId == this.id);
          console.log(this.assessmentPayload[0]);

          this.attendTest();
        });
      }

      else{
        this.router.navigate(['/not-found']);
      }
    }
  }  

  attendTest() {
    const navigationExtras : NavigationExtras = {
      state: {
        data: this.assessmentPayload[0]
      }
    }
    setTimeout(() => {
      this.router.navigate(['/instructions', this.id], navigationExtras);
    }, 3000);
  } 
}
