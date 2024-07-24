import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss'
})
export class DeleteConfirmationComponent {

  @Output() confirmation = new EventEmitter<void>();
  @ViewChild('cd') cd!: ConfirmDialog;


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}
 
  confirm() {
    this.confirmationService.confirm({
      header: 'Do you want to delete role?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have deleted the role', life: 3000 });
        this.confirmation.emit();
      },
      reject: () => {
        //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected deletion', life: 3000 });
      }
    });
  }

 


}


