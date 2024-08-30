
import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus, AuthenticationResult } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthComponent } from '../../guard/auth/auth.component'; 
import { AuthService } from '../../service/auth/auth.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AuthComponent,
    ResetPasswordComponent,
    MessagesModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  showPassword = false;
  hide = signal(true);
  loginDisplay: boolean = false;
  isIframe = false;
  resetPassword: boolean = false;
  userInactive: boolean = false;
  email: string = '';

  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private authUserService: AuthService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    });

    if(localStorage.getItem("loginToken")){
      this.router.navigate(['/auth']);
    }

    console.log(localStorage.getItem("loginToken"));
  }

  ngOnInit(): void {
    // Handle redirect and store token if available
    this.authService.handleRedirectObservable().subscribe((response: AuthenticationResult) => {
      if (response && response.accessToken) {
        console.log('Login successful', response);
        localStorage.setItem('loginToken', response.accessToken);
        this.router.navigate(['/auth']);
      }
    });

    this.isIframe = window !== window.parent && !window.opener;

    this.setLoginDisplay();
    this.authService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });

    // Check for active account and store token
    this.checkAndSetActiveAccount();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    const activeAccount = this.authService.instance.getActiveAccount();
    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      const account = this.authService.instance.getAllAccounts()[0];
      this.authService.instance.setActiveAccount(account);
      
      // Acquire token silently
      this.authService.acquireTokenSilent({
        scopes: ["user.read"],
        account: account
      }).subscribe({
        next: (response: AuthenticationResult) => {
          if (response && response.accessToken) {
            localStorage.setItem('loginToken', response.accessToken);
            console.log('Token acquired silently', response.accessToken);
          }
        },
        error: (error) => {
          console.error('Silent token acquisition failed', error);
        }
      });
    }
  }

  loginRedirect() {
    this.authService.loginRedirect(this.msalGuardConfig.authRequest as any);
  }

  logout() {
    this.authService.logoutRedirect();
  }

  onSubmit(): void {
    if (!this.showPassword) {
      const email = this.loginForm.get('email')?.value;
      console.log(email);
      this.checkEmailProvider(email);
    } else {
      this.handleExternalLogin(this.loginForm.value);
    }
  }

  checkEmailProvider(email: string) {
    const microsoftDomains = ['outlook.com', 'hotmail.com', 'live.com', 'microsoft.com'];
    const domain = email.split('@')[1];

    if (microsoftDomains.includes(domain)) {
      this.handleMicrosoftLogin();
    } else {
      this.showPassword = true;
      this.loginForm.get('password')?.setValidators([Validators.required]);
      this.loginForm.get('password')?.updateValueAndValidity();
    }
  }

  handleMicrosoftLogin() {
    console.log('Handle Microsoft login for email:', this.loginForm.get('email')?.value);
    this.loginRedirect();
  }

  handleExternalLogin(loginForm: FormGroup) {
    console.log(loginForm);
    this.authUserService.externalTrainerLogin(loginForm).subscribe(
      response => {
        if(!response.isSuccess){
          if(!response.result && response.statusCode == 401){
            console.log("Invalid username or password", response);
            this.messageService.add({ severity: 'error', summary: 'Login failed ', detail: 'Invalid email or password', life: 5000 });
          }
          else if(response.statusCode == 403){
            console.log("User inactive, Reset Password", response);
            this.messageService.add({ severity: 'error', summary: 'Login failed ', detail: 'Password Expired ! Reset Password to continue', life: 10000 });
            this.userInactive = true;
            this.resetPassword = true;
            this.email = response.result;
          }
        }
        else if(response.isSuccess){
          console.log("Login successful", response);
          localStorage.setItem('loginToken', response.result.token);
          this.router.navigate(['/auth']);
        }
      },
      error => {
        console.log("Login failed", error);
      }
    )
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  forgotPassword() {
    this.resetPassword = true;
  }
}
