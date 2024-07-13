import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageServiceComponent } from './components/message-service/message-service.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Online-Assessment-Tool-Frontend';
}
