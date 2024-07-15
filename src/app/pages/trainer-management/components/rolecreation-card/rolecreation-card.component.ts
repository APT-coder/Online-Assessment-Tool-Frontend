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
  @Input() role: Role = {
    roleId: 0,
    roleName: '',
    permissions: []
  };
  @Output() cancelRoleCreation: EventEmitter<void> = new EventEmitter<void>();
  @Output() roleSaved: EventEmitter<void> = new EventEmitter<void>();

  permissions: Permission[] = [];

  constructor(private apiService: TrainermanagementService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getPermissions().subscribe((data: Permission[]) => {
      this.permissions = data;
      console.log(this.permissions);
    });

    // Ensure role.permissions is always an array
    if (!this.role) {
      this.role = {
        roleName: '',
        permissions: []
      };
    } else if (!this.role.permissions) {
      this.role.permissions = [];
    }
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
    if (this.role.permissions.length === 0) {
      console.error('Please select at least one permission');
      return;
    }

    if (this.role.roleId) {
      // Update role
      this.apiService.updateRole(this.role.roleId, this.role)
        .subscribe(
          (response: Role) => {
            console.log('Role updated successfully:', response);
            this.roleSaved.emit();
            this.resetForm();
          },
          error => {
            console.error('Error updating role:', error);
          }
        );
    } else {
      // Create new role
      this.apiService.createRoleWithPermissions(this.role)
        .subscribe(
          (response: Role) => {
            console.log('Role created successfully:', response);
            this.roleSaved.emit();
            this.resetForm();
            window.location.reload();
          },
          error => {
            console.error('Error creating role:', error);
          }
        );
    }
  }

  resetForm() {
    this.role = {
      roleName: '',
      permissions: []
    };
  }

  cancelRole() {
    this.cancelRoleCreation.emit();
  }
}