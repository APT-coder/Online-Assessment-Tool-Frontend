import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class AccountcreationModalComponent  implements OnInit {
  @Input() visible: boolean = false; 
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  trainerForm: FormGroup;
  roles: Role[] = [];
  batches: any[] = [];
  permissions: Permission[] = [];
  selectedPermissions: number[] = [];

  constructor(private fb: FormBuilder) {
    this.trainerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: [null, Validators.required],
      password: ['', Validators.required],
      selectedBatches: [[], Validators.required]
    });

    // Mock data for roles and batches
    this.roles = [
      {
        roleId: 1,
        roleName: 'Admin',
        permissions: [
          { permissionId: 1, description: 'Create' },
          { permissionId: 2, description: 'Read' },
          { permissionId: 3, description: 'Update' },
          { permissionId: 4, description: 'Delete' }
        ]
      },
      {
        roleId: 2,
        roleName: 'Trainer',
        permissions: [
          { permissionId: 1, description: 'Create' },
          { permissionId: 2, description: 'Read' }
        ]
      },
      {
        roleId: 3,
        roleName: 'Trainee',
        permissions: [
          { permissionId: 2, description: 'Read' }
        ]
      }
    ];

    this.batches = [
      { id: 1, name: 'Batch 1' },
      { id: 2, name: 'Batch 2' },
      { id: 3, name: 'Batch 3' }
    ];

    this.permissions = [
      { permissionId: 1, description: 'Create' },
      { permissionId: 2, description: 'Read' },
      { permissionId: 3, description: 'Update' },
      { permissionId: 4, description: 'Delete' }
    ];
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  closeModal() {
    this.visible = false;
    this.trainerForm.reset();
  }

  saveTrainer() {
    if (this.trainerForm.valid) {
      // Handle form submission logic here
      const trainerData = this.trainerForm.value;
      trainerData.selectedPermissions = this.selectedPermissions;
      console.log('Trainer data:', trainerData);
      // Close the modal after saving
      this.closeModal();
    } else {
      // Mark all controls as touched to trigger validation messages
      this.trainerForm.markAllAsTouched();
    }
  }
}