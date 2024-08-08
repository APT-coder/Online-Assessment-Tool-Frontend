import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error.message);

        if (error.status === 404) {
          this.snackBar.open('The requested resource was not found.', 'Close', {
            duration: 3000,
          });
        } else if (error.status >= 500 && error.status < 600) {
          this.router.navigate(['/server-error']);
        } else {
          this.snackBar.open('An error occurred. Please try again later.', 'Close', {
            duration: 3000,
          });
        }

        return throwError(() => new Error('An error occurred'));
      })
    );
  }
}
