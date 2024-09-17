import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Role } from '../../../../shared/models/role.interface';
import { Permission } from '../../../../shared/models/permission.interface';
import { ApiResponse, TrainermanagementService } from '../../../../service/trainer-management/trainermanagement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rolecreation-card',
  standalone: true,
  imports: [CardModule, CommonModule, FormsModule, DialogModule, CheckboxModule, ButtonModule],
  templateUrl: './rolecreation-card.component.html',
  providers: [MessageService],
  styleUrls: ['./rolecreation-card.component.scss']
})
export class RolecreationCardComponent implements OnInit {
  @Input() role: Role = { id: 0, roleName: '', permissionIds: [] };
  @Input() isEditMode: boolean = false;
  @Input() isModalVisible: boolean = false;

  @Output() cancelRoleCreation: EventEmitter<void> = new EventEmitter<void>();
  @Output() roleSaved: EventEmitter<void> = new EventEmitter<void>();

  permissions: Permission[] = [];
  existingRoles: Role[] = [];  // Array to store existing roles for uniqueness check

  constructor(private roleService: TrainermanagementService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadPermissions();
    this.loadExistingRoles();  // Load existing roles
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['role'] && !changes['role'].firstChange) {
      this.loadPermissions();
    }
    if (changes['isModalVisible']) {
      // Handle modal visibility changes if necessary
    }
  }

  loadPermissions() {
    this.roleService.getPermissions().subscribe(response => {
      if (response.isSuccess) {
        this.permissions = response.result;
        this.initializeSelectedPermissions();
      } else {
        console.error('Error loading permissions:', response.message);
      }
    });
  }

  loadExistingRoles() {
    this.roleService.getAllRoles().subscribe(response => {
      if (response.isSuccess) {
        this.existingRoles = response.result;
      } else {
        console.error('Error loading roles:', response.message);
      }
    });
  }

  initializeSelectedPermissions() {
    this.permissions.forEach(permission => {
      permission.isSelected = this.isPermissionSelected(permission.id);
    });
  }

  isPermissionSelected(permissionId: number): boolean {
    return this.role.permissionIds.includes(permissionId);
  }

  onCheckboxChange(event: any) {
    const permissionId = +event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.role.permissionIds.push(permissionId);
    } else {
      this.role.permissionIds = this.role.permissionIds.filter(id => id !== permissionId);
    }
  }

  isRoleNameUnique(roleName: string): boolean {
    return !this.existingRoles.some(role => role.roleName.toLowerCase() === roleName.toLowerCase() && role.id !== this.role.id);
  }

  submitRole() {
    if (this.role.permissionIds.length === 0) {
      alert('Please select at least one permission.');
      return;
    }

    if (!this.isRoleNameUnique(this.role.roleName)) {
      alert('Role name already exists. Please choose a different name.');
      return;
    }

    const roleData = {
      id: this.role.id,
      roleName: this.role.roleName,
      permissionIds: this.role.permissionIds
    };

    if (this.isEditMode) {
      this.roleService.updateRole(this.role.id, roleData).subscribe(response => {
        this.roleSaved.emit();
        this.messageService.add({ severity: 'success', summary: 'Role Updated', detail: 'You have successfully Updated the role', life: 3000 });
        console.log('Role updated successfully', response);
      }, error => {
        console.error('Error updating role', error);
      });
    } else {
      this.roleService.createRole(roleData).subscribe(response => {
        if (response.isSuccess) {
          this.roleSaved.emit();
          this.messageService.add({ severity: 'success', summary: 'Role Created', detail: 'You have successfully created the role', life: 3000 });
          console.log('Role created successfully', response.result);
        } else {
          console.error('Error creating role', response.message);
        }
      });
    }
  }

  cancelRole() {
    this.isModalVisible = false;
    this.cancelRoleCreation.emit();
  }

  closeModal() {
    this.isModalVisible = false;
    this.cancelRoleCreation.emit();
  }
}
