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
import { Role } from '../../../../../models/role.interface';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { AccountcreationModalComponent } from "../accountcreation-modal/accountcreation-modal.component";
import { User } from '../../../../../models/user.interface'; 
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-trainer-table',
  standalone: true,
  imports: [TableModule, HttpClientModule, ButtonModule, RippleModule, TagModule, NgIf, NgFor, FontAwesomeModule, DeleteConfirmationComponent, AccountcreationModalComponent],
  templateUrl: './trainer-table.component.html',
  styleUrl: './trainer-table.component.scss'
})
export class TrainerTableComponent {
  @Output() editRole: EventEmitter<Role> = new EventEmitter<Role>();
  faPen = faPen;
  faTrash = faTrash;
  faChevronDown = faChevronDown;
  roles: Role[] = [];
  role: Role = { id: 0, roleName: '', permissions: [] };
  users:any [] = [];
  roleIdToDelete: number = 0;
  expandedRoles: string[] = [];
  isEditTrainer: boolean = false;
  selectedUser: User | null = null;
  @ViewChild(DeleteConfirmationComponent) deleteConfirmationComponent!: DeleteConfirmationComponent;

  constructor(private apiService: TrainermanagementService) {}

  ngOnInit(): void {
    this.loadRoles();
  }
  
  onEditUser(user: User): void {
    this.selectedUser = user;
    this.isEditTrainer = true;
    if(user.userType ===1){
      this.loadTrainerDetails(user.userId);
    }  else if (user.userType === 2) {
      this.loadTraineeDetails(user.userId);
    } else {
      console.error('Invalid user type');
    }
   
  }

 

  loadTrainerDetails(userId: number): void {
    this.apiService.getTrainerDetails(userId).subscribe(
      trainerDetails => {
        // Populate trainer-specific details
        this.selectedUser = { ...this.selectedUser, ...trainerDetails };
      },
      error => {
        console.error('Error loading trainer details:', error);
        // Handle error
      }
    );
  }

  loadTraineeDetails(userId: number): void {
    this.apiService.getTraineeDetails(userId).subscribe(
      traineeDetails => {
        // Populate trainee-specific details
        this.selectedUser = { ...this.selectedUser, ...traineeDetails };
      },
      error => {
        console.error('Error loading trainee details:', error);
        // Handle error
      }
    );
  }

  

  loadRoles(): void {
    this.apiService.getAllRoles().subscribe(
      response => {
        if (response.isSuccess) {
          this.roles = response.result;
        } else {
          console.error('Failed to load roles:', response.message);
        }
      },
      error => {
        console.error('Error loading roles:', error);
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
    console.log('Loading users for role:', role); // Check if role has expected properties
  
    if (!role || !role.roleName) {
      console.error('Role or roleName is undefined:', role);
      return;
    }
  
    this.apiService.getUsersByRoleName(role.roleName).subscribe(
      response => {
        console.log('Users fetched:', response); 
          role.users = response 
          console.log('Users assigned to role:', role.users); 
       
          console.error('Failed to load users for role:', response.result);
        
      },
      error => {
        console.error('Error loading users for role:', error);
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
          console.log(this.role);
        }
    this.editRole.emit(this.role);
   
      });
    }

  deleteUser(userId: number): void {
    if (userId !== undefined && userId !== null) {
      console.log('Deleting user with id:', userId);
      this.apiService.deleteUser(userId).subscribe(
        () => {
          // Update the local role data to reflect the deletion
          this.roles.forEach(role => {
            if (role.users) {
              role.users = role.users.filter(user => user.userId !== userId);
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