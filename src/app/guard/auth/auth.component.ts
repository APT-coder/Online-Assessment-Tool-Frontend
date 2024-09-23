import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service'; 
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ProgressSpinnerModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  userRoleData: any;
  isLoading = true;

  constructor(private authService: AuthService, private route: Router) {
    this.initializeUserRoleAndRoute();
  }

  async initializeUserRoleAndRoute(): Promise<void> {
    try {
      this.userRoleData = await this.getUserRole();
      localStorage.setItem("userDetails", JSON.stringify(this.userRoleData.result));
      localStorage.setItem("apiToken", this.userRoleData.result.Token);

      console.log('User role data:', this.userRoleData.result);
      console.log('API Token:', this.userRoleData.result.Token);

      setTimeout(() => {
        
        if (this.userRoleData.UserType === 0) {
          this.route.navigate(['/app/admin']);
        } else if (this.userRoleData.UserType === 1) {
          this.route.navigate(['/app/trainer']);
        } else {
          this.route.navigate(['/app/trainee']);
        }
      }, 1000);
    } catch (error) {
      console.error('Error fetching user role data:', error);
    }
  }

  getUserRole(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getUserRole(localStorage.getItem("loginToken") as string).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}