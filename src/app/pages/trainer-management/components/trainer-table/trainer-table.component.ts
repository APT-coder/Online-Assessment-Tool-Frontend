import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiResponse, TrainermanagementService } from '../../../../service/trainer-management/trainermanagement.service';
import { Role } from '../../../../shared/models/role.interface';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { AccountcreationModalComponent } from "../accountcreation-modal/accountcreation-modal.component";
import { User } from '../../../../shared/models/user.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-trainer-table',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule, NgIf, NgFor, FontAwesomeModule, DeleteConfirmationComponent, AccountcreationModalComponent],
  templateUrl: './trainer-table.component.html',
  styleUrls: ['./trainer-table.component.scss']
})
export class TrainerTableComponent {
  @Output() editRole: EventEmitter<Role> = new EventEmitter<Role>();
  faPen = faPen;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  roles: Role[] = [];
  role: Role = { id: 0, roleName: '', permissionIds: [] };
  users: User[] = [];
  roleIdToDelete: number = 0;
  expandedRoles: string[] = [];
  isEditTrainer: boolean = false;
  selectedUser: User | null = null;
  message: string = "";
  @ViewChild(DeleteConfirmationComponent) deleteConfirmationComponent!: DeleteConfirmationComponent;

  constructor(private apiService: TrainermanagementService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  onEditUser(user: User): void {
    this.selectedUser = user;
    this.isEditTrainer = true;
    if (user.userType === 1) {
      // Load trainer details if necessary
    } else if (user.userType === 2) {
      // Load trainee details if necessary
    } else {
      console.error('Invalid user type');
    }
  }

  loadRoles(): void {
    this.apiService.getAllRoles().subscribe(
      response => {
        if (response.isSuccess) {
          this.roles = response.result;
          this.roles.forEach(role => this.loadUsersForRole(role));
        } else {
          console.error('Failed to load roles:', response.message);
        }
      },
      error => {
        console.error('Error loading roles:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load roles', life: 3000 });
      }
    );
  }

  toggleRoleExpansion(role: Role): void {
    const index = this.expandedRoles.indexOf(role.roleName);
    if (index === -1) {
      this.expandedRoles.push(role.roleName);
      this.loadUsersForRole(role);
    } else {
      this.expandedRoles.splice(index, 1);
    }
  }

  loadUsersForRole(role: Role): void {

    if (!role || !role.roleName) {
      console.error('Role or roleName is undefined:', role);
      this.message = 'Invalid role or role name.';
      return;
    }

    this.apiService.getUsersByRoleName(role.roleName).subscribe(
      response => {

        if (response.message) {
          this.message = response.message;
          role.users = [];
        } else {
          role.users = response;
          this.message = '';
        }
      },
      error => {
        console.error('Error fetching users:', error);
        if (error.status === 404) {
          this.message = 'No users found for the selected role.';
        } else {
          this.message = 'An error occurred while fetching users. Please try again later.';
        }
        role.users = [];
      }
    );
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

  onEditRole(role: Role): void {
    this.apiService.getRoleById(role.id).subscribe(
      (response: ApiResponse<Role>) => {
        if (response.isSuccess) {
          this.role = response.result;
          this.editRole.emit(this.role);
        } else {
          console.error('Error retrieving role:', response.message);
        }
      },
      error => {
        console.error('API call error:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    if (userId !== undefined && userId !== null) {
      this.apiService.deleteUser(userId).subscribe(
        () => {
          this.roles.forEach(role => {
            if (role.users) {
              role.users = role.users.filter(user => user.userId !== userId);
              this.messageService.add({ severity: 'success', summary: 'Deleted Successfully', detail: 'User Deleted Successfully', life: 3000 });
            }
          });
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.error('Invalid user ID:', userId);
    }
  }
}
