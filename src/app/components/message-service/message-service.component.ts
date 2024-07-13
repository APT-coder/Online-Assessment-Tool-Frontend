import { Component, Input } from '@angular/core';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-message-service',
  standalone: true,
  imports: [MessagesModule],
  templateUrl: './message-service.component.html',
  styleUrl: './message-service.component.scss'
})
export class MessageServiceComponent {
    @Input() messages: any[] = [];
    @Input() progressBarColor: string = '#4caf50';
    @Input() isVisible: boolean = false;  
    progressWidth: number = 0;

    ngOnInit() {
        if (this.isVisible) {
            this.messages = [
                { severity: 'success', summary: 'Success', detail: 'Test assigned successfully' },
            ];

            this.startProgressBar();
        }
    }

    startProgressBar() {
        const interval = setInterval(() => {
            if (this.progressWidth < 100) {
                this.progressWidth += 2;
            } else {
                clearInterval(interval);
                this.clearMessages();
            }
        }, 100);
    }

    clearMessages() {
        this.messages = [];
        this.progressWidth = 0;
        this.isVisible = false;
    }

}
