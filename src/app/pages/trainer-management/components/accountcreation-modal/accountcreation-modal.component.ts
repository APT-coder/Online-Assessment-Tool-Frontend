import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../../../models/role.interface';
import { Permission } from '../../../../../models/permission.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accountcreation-modal',
  standalone: true,
  imports: [DialogModule,
    ButtonModule, 
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
     AvatarModule,
    CheckboxModule,
  MultiSelectModule,
CommonModule],
  templateUrl: './accountcreation-modal.component.html',
  styleUrl: './accountcreation-modal.component.scss'
})
export class AccountcreationModalComponent   implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>(); 
  trainerForm!: FormGroup;
  roles: any[] = []; 
  batches: any[] = []; 
  permissions: any[] = []; 

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.trainerForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      role: [''],
      password: [''],
      selectedBatches: [[]],
      permissions: this.fb.array([])
    });

    this.addPermissionsControls();
  }

  addPermissionsControls() {
    const permissionsArray = this.trainerForm.get('permissions') as FormArray;
    this.permissions.forEach(() => {
      permissionsArray.push(new FormControl(false));
    });
  }

  closeModal() {
    this.visible = false;
  }

  saveTrainer() {
    if (this.trainerForm.valid) {
      const trainerData = this.trainerForm.value;
      console.log(trainerData);
      // Implement your save logic here
      this.closeModal();
    }
  }
}