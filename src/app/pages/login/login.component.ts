
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
    AuthComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  showPassword = false;
  hide = signal(true);
  loginDisplay: boolean = false;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    // Handle redirect and store token if available
    this.authService.handleRedirectObservable().subscribe((response: AuthenticationResult) => {
      if (response && response.accessToken) {
        console.log('Login successful', response);
        localStorage.setItem('msalKey', response.accessToken);
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
            localStorage.setItem('msalKey', response.accessToken);
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
      console.log('Logging in with', this.loginForm.value);
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

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
