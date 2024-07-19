import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Role } from '../../../../../models/role.interface';
import { Permission } from '../../../../../models/permission.interface';
import { TrainermanagementService } from '../../../../service/trainer-management/trainermanagement.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-rolecreation-card',
  standalone: true,
  imports: [CardModule, CommonModule,FormsModule],
  templateUrl: './rolecreation-card.component.html',
  styleUrl: './rolecreation-card.component.scss'
})
export class RolecreationCardComponent implements OnInit {
  @Input() role: Role = { id: 0, roleName: '', permissions: [] };
  @Input() isEditMode: boolean = false;
  @Output() cancelRoleCreation: EventEmitter<void> = new EventEmitter<void>();
  @Output() roleSaved: EventEmitter<void> = new EventEmitter<void>();

  permissions: Permission[] = [];

  constructor(private apiService: TrainermanagementService) {}

  ngOnInit(): void {
    this.loadPermissions();
    if (!this.role.permissions) {
      this.role.permissions = [];
    }
  }

  loadPermissions() {
    this.apiService.getPermissions().subscribe((data: Permission[]) => {
      this.permissions = data;
      console.log('Permissions loaded:', this.permissions);
    });
  }

  togglePermission(permission: Permission) {
    const index = this.role.permissions.findIndex(p => p.permissionId === permission.permissionId);
    if (index === -1) {
      this.role.permissions.push(permission);
    } else {
      this.role.permissions.splice(index, 1);
    }
  }

  isPermissionSelected(permission: Permission): boolean {
    return this.role.permissions.some(p => p.permissionId === permission.permissionId);
  }

  submitRole() {
    if (this.isEditMode) {
      this.updateRole();
    } else {
      this.createRole();
    }
  }
  
  createRole() {
    // Ensure roleId is not set for create operation
    this.apiService.createRoleWithPermissions(this.role)
      .subscribe(
        (response: Role) => {
          console.log('Role created successfully:', response);
         
          this.roleSaved.emit();
          this.resetForm();
          window.location.reload(); // Consider a better way to refresh data
        },
        error => {
          console.error('Error creating role:', error);
        }
      );
  }
  
  updateRole() {
    if (this.role.permissions.length === 0) {
      console.error('Please select at least one permission');
      // Optionally show a user-friendly message or alert
      return;
    }
  
    this.apiService.updateRole(this.role.id, this.role)
      .subscribe(
        (response) => {
          console.log('Role updated successfully:', response);
          
          this.roleSaved.emit();
          this.resetForm();
        },
        error => {
          console.error('Error updating role:', error);
          console.log(this.role.id)
        }
      );
  }
  

  resetForm() {
    this.role = {
      id: 0,
      roleName: '',
      permissions: []
    };
  }

  cancelRole() {
    this.cancelRoleCreation.emit();
  }
}