import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiEndpointService } from './service/api-service/api-endpoint.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Online-Assessment-Tool-Frontend';

  constructor(private apiEndpointService: ApiEndpointService) { }

  ngOnInit(): void {
    this.apiEndpointService.loadEndpoints().subscribe();
  }
}
