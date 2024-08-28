import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApiUrl = 'https://localhost:7120/api/Auth';

  constructor(private http: HttpClient) {}

  getUserRole(token: string): Observable<any> {
    const url = `${this.authApiUrl}/AzureSSOLogin/getUserRole/${token}`;
    return this.http.get<any>(url);
  }

  externalTrainerLogin(loginRequest: any): Observable<any> {
    const url = `${this.authApiUrl}/ExternalTrainerLogin`;
    return this.http.post<any>(url, loginRequest);
  }

  generateOtp(email: string): Observable<any> {
    const url = `${this.authApiUrl}/GenerateOtp/generate`;
    const payload = {
      email: email
    }
    return this.http.post<any>(url, payload);
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    const url = `${this.authApiUrl}/VerifyOtp/verify`;
    const payload = {
      email: email,
      otp: otp
    }
    return this.http.post<any>(url, payload);
  }

  resetPassword(email: string, password: string): Observable<any> {
    const url = `${this.authApiUrl}/TrainerResetPassword`;
    const payload = {
      email: email,
      password: password
    }
    return this.http.put<any>(url, payload);
  }
}
