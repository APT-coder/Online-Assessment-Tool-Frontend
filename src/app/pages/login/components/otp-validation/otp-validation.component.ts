import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { AuthService } from '../../../../service/auth/auth.service';

@Component({
  selector: 'app-otp-validation',
  standalone: true,
  imports: [ButtonModule, InputOtpModule, CommonModule, FormsModule],
  templateUrl: './otp-validation.component.html',
  styleUrl: './otp-validation.component.scss'
})
export class OtpValidationComponent {
  value: any;
  email: string = '';

  @Output() otpVerified: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private authService: AuthService) {}

  verifyOtp() {
    this.email = localStorage.getItem("email") as string;
    console.log(this.email, this.value);

    this.authService.verifyOtp(this.email, this.value).subscribe(
      response => {
        console.log(response);
        this.otpVerified.emit(true);
      },
      error => {
        console.log(error);
      }
    )
  }
}
