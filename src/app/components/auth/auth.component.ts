import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  userRoleData: any;
  isLoading = true; // Added property to control spinner visibility

  constructor(private userService: UserService, private route: Router) {
    this.initializeUserRoleAndRoute();
  }

  async initializeUserRoleAndRoute(): Promise<void> {
    try {
      this.userRoleData = await this.getUserRole();
      localStorage.setItem("userDetails", JSON.stringify(this.userRoleData));
      console.log('User role data:', this.userRoleData);

      // Wait for 3 seconds before redirecting
      setTimeout(() => {
        
        if (this.userRoleData.UserType === 0) {
          this.route.navigate(['/admin']);
        } else if (this.userRoleData.UserType === 1) {
          this.route.navigate(['/trainer']);
        } else {
          this.route.navigate(['/trainee']);
        }
      }, 8000);
    } catch (error) {
      console.error('Error fetching user role data:', error);
      // Handle the error as needed, e.g., redirect to an error page
    }
  }

  getUserRole(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserRole(localStorage.getItem("msalKey") as string).subscribe(
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
