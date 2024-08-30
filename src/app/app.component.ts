import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class AppComponent {
  title = 'Online-Assessment-Tool-Frontend';

  constructor() { }

  ngOnInit(): void {
    console.log("test");
  }
}
