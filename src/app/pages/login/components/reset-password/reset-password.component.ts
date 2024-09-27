import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OtpValidationComponent } from "../otp-validation/otp-validation.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../service/auth/auth.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [DialogModule, AvatarModule, ButtonModule, OtpValidationComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  @Input() visible: boolean = false;
  @Input() userInactive: boolean = false;
  @Input() email: string = '';

  emailEntered: boolean = false;
  otpValidated: boolean = false;
  passwordReset: boolean = false;

  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.changePasswordForm = this.fb.group({
      email: [{ value: this.email, disabled: true }], // Non-editable email
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  generateOtp() {
    if (this.emailForm.valid) {
      const emailValue = this.emailForm.get('email')?.value;
      localStorage.setItem("email", emailValue);
      this.emailEntered = true;

      this.authService.generateOtp(emailValue).subscribe(
        response => {
          console.log("OTP sent successfully", response);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      console.log('Invalid Email');
    }
  }

  verifyOtp(data: boolean){
    if(data){
      this.otpValidated = true;
    }
  }

  resendOtp(data: boolean){
    if(data){
      this.generateOtp();
    }
  }

  passwordMatchValidator(form: FormGroup): null | { passwordMismatch: boolean } {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  submitPassword(userInactive: boolean) {
    if(!userInactive){
      if (this.passwordForm.valid) {
        const passwordValue = this.passwordForm.get('password')?.value;
        const email = localStorage.getItem("email") as string;

        this.resetPassword(email, passwordValue);
      } else {
        console.log('Invalid Password');
      }
    }
    else{
      if (this.changePasswordForm.valid) {
        const emailValue = this.changePasswordForm.get('email')?.value;
        const newPasswordValue = this.changePasswordForm.get('newPassword')?.value;

        this.resetPassword(emailValue, newPasswordValue);
      } else {
        console.log('Form is invalid');
      }
    }
  }

  resetPassword(email: string, passwordValue: string) {
    this.authService.resetPassword(email, passwordValue).subscribe(
      response => {
        if(response.isSuccess){
          console.log("Password Reset Successful");
          this.passwordReset = true;
          this.userInactive = false;
          localStorage.removeItem("email");
        }
        else{
          console.log("Password reset failed", response);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
