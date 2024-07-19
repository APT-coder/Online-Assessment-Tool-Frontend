import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faPen, faPencilAlt, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { NgFor, NgIf } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { TrainermanagementService } from '../../../../service/trainer-management/trainermanagement.service';
import { Role } from '../../../../../models/role.interface';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-trainer-table',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule, NgIf, NgFor, FontAwesomeModule, DeleteConfirmationComponent],
  templateUrl: './trainer-table.component.html',
  styleUrl: './trainer-table.component.scss'
})
export class TrainerTableComponent {
  @Output() editRole: EventEmitter<Role> = new EventEmitter<Role>();
  faPen = faPen;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
    roles: Role[] = [];
    roleIdToDelete: number = 0;
    expandedRoles: string[] = [];
  @ViewChild(DeleteConfirmationComponent) deleteConfirmationComponent!: DeleteConfirmationComponent;

    constructor(private apiService: TrainermanagementService) { }
  
    ngOnInit() {
      this.loadRoles();
    }
  
    loadRoles() {
      this.apiService.getAllRoles().subscribe(
        (roles: Role[]) => {
          this.roles = roles;
         
        },
        (error) => {
          console.error('Error loading roles:', error);
        }
      );
    }


    toggleRoleExpansion(roleName: string) {
      const index = this.expandedRoles.indexOf(roleName);
      if (index === -1) {
        this.expandedRoles.push(roleName);
      } else {
        this.expandedRoles.splice(index, 1);
      }
    }
  


deleteRole(roleId: number): void {
  this.roleIdToDelete = roleId;
  this.deleteConfirmationComponent.confirm();
}

onConfirmDelete(): void {
  this.apiService.deleteRole(this.roleIdToDelete).subscribe(() => {
    this.roles = this.roles.filter(role => role.id !== this.roleIdToDelete);
  });
}

onEditRole(role: Role) {
  this.editRole.emit(role);
  console.log(role);
}
// calculateUserTotal(roleName: string): number {
//     const role = this.roles.find(r => r.role === roleName);
//     return role ? role.numberOfUsers : 0;
// }
// pencilIcon: IconDefinition = faPencilAlt;
// trashIcon: IconDefinition = faTrashAlt;
}

