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
  timer: number = 120;
  interval: any;
  canResend: boolean = false;

  @Output() otpVerified: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() otpResend: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.canResend = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

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

  resendCode() {
    if (this.canResend) {
      this.otpResend.emit(true);
      this.canResend = false;
      this.timer = 120;
      this.startTimer();
    }
  }
}
