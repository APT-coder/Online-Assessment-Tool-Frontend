import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accountcreation-modal',
  standalone: true,
  imports: [DialogModule,
    ButtonModule, 
    InputTextModule,
    DropdownModule,
    FormsModule,
    PasswordModule,
     AvatarModule],
  templateUrl: './accountcreation-modal.component.html',
  styleUrl: './accountcreation-modal.component.scss'
})
export class AccountcreationModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  trainer: any = {
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    batch: ''
  };
  roles = [{ label: 'Role 1', value: 'role1' }, { label: 'Role 2', value: 'role2' }];
  batches = [{ label: 'Batch 1', value: 'batch1' }, { label: 'Batch 2', value: 'batch2' }];

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.resetForm();
  }

  saveTrainer() {

    console.log('Trainer saved', this.trainer);
    this.closeModal();
  }

  resetForm() {
    this.trainer = {
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      batch: ''
    };
  }
  
}
