import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Role } from '../../../../../models/role.interface';
import { Permission } from '../../../../../models/permission.interface';
import { ApiResponse, TrainermanagementService } from '../../../../service/trainer-management/trainermanagement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rolecreation-card',
  standalone: true,
  imports: [CardModule, CommonModule, FormsModule],
  templateUrl: './rolecreation-card.component.html',
  styleUrls: ['./rolecreation-card.component.scss']
})
export class RolecreationCardComponent implements OnInit {
  @Input() role: Role = { id: 0, roleName: '', permissions: [] };
  @Input() isEditMode: boolean = false;
  @Output() cancelRoleCreation: EventEmitter<void> = new EventEmitter<void>();
  @Output() roleSaved: EventEmitter<void> = new EventEmitter<void>();

 
  permissions: Permission[] = [];
 

  constructor(private roleService: TrainermanagementService) { }

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions() {
    this.roleService.getPermissions().subscribe(response => {
      if (response.isSuccess) {
        this.permissions = response.result.slice(0,4);
      }
    });
  }

  onCheckboxChange(event: any) {
    const permissionId = +event.target.value;
    const isChecked = event.target.checked;
    
    if (isChecked) {
      this.role.permissions.push({
        id: permissionId,
        permissionName: '',
        description: ''
      });
    } else {
      this.role.permissions = this.role.permissions.filter(p => p.id !== permissionId);
    }
  }

  isPermissionSelected(permissionId: number): boolean {
    return this.role.permissions.some(p => p.id === permissionId);
  }

  submitRole() {
    this.roleService.createRole(this.role).subscribe(response => {
      if (response.isSuccess) {
        this.roleSaved.emit();
        // Handle success (e.g., show a message or redirect)
        console.log('Role created successfully', response.result);
      } else {
        // Handle error
        console.error('Error creating role', response.message);
      }
    });
  }

  cancelRole() {
    this.cancelRoleCreation.emit();
  }

 
}