import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ButtonActiveComponent } from "../../ui/buttons/button-active/button-active.component";

import { TrainermanagementService } from '../../service/trainer-management/trainermanagement.service';
import { Role } from '../../../models/role.interface';
import { RolecreationCardComponent } from "./components/rolecreation-card/rolecreation-card.component";
import { AccountcreationModalComponent } from "./components/accountcreation-modal/accountcreation-modal.component";
import { TrainerTableComponent } from "./components/trainer-table/trainer-table.component";

@Component({
    selector: 'app-trainer-management',
    templateUrl: './trainer-management.component.html',
    styleUrls: ['./trainer-management.component.scss'],
    imports: [
    FontAwesomeModule,
    CommonModule,
    RolecreationCardComponent,
    ButtonActiveComponent,
    SidebarComponent,
    AccountcreationModalComponent,
    TrainerTableComponent
],
    standalone:true
})
export class TrainerManagementComponent {

    // isAddTrainer: boolean = false;
  isCardVisible: boolean = false;
  isSidebarCollapsed: boolean = false;
  selectedRole: Role = { id: 0, roleName: '', permissions: [] };
  isEditMode: boolean = false; // Assuming this is set elsewhere based on your application logic

  constructor(private apiService: TrainermanagementService) {}

  ngOnInit() {
    // Optionally load initial data or setup
  }

  ShowTrainer() {
    this.isAddTrainer = !this.isAddTrainer;
    if (this.isAddTrainer) {
      this.isCardVisible = false;
    }
  }

  toggleCard() {
    this.isCardVisible = !this.isCardVisible;
    if (this.isCardVisible) {
      this.isAddTrainer = false;
      this.isEditMode = false; // Ensure it's not in edit mode when toggling card for new role
      this.selectedRole = { id: 0, roleName: '', permissions: [] }; // Clear the selected role for new role creation
    }
  }

  editRole(role: Role) {
    this.selectedRole = { ...role }; // Set the selected role (make a copy to avoid reference issues)
    this.isCardVisible = true; // Show the role creation card
    this.isEditMode = true; // Set the edit mode
  }

  onCancelRoleCreation() {
    this.isCardVisible = false;
    this.selectedRole = { id: 0, roleName: '', permissions: [] }; // Reset selected role for cancellation
  }

  onRoleSaved() {
    this.isCardVisible = false;
    // Optionally reload data or perform other actions after role is saved
  }
  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
  isAddTrainer: boolean = false;
  isEditTrainer: boolean = false;
  isDeleteTrainer: boolean = false;
  selectedUser: any = null; // The user data to edit or delete

  // Method to open modal for adding a new trainer
  addTrainer() {
    this.isAddTrainer = true;
    this.selectedUser = null; // Clear selected user data
  }
  editTrainer(user: any) {
    this.isEditTrainer = true;
    this.selectedUser = user; // Set selected user data for editing
  }

  // Method to open modal for deleting a trainer
  deleteTrainer(user: any) {
    this.isDeleteTrainer = true;
    this.selectedUser = user; // Set selected user data for deletion
  }

  // Method to close the modal
  closeModal() {
    this.isAddTrainer = false;
    this.isEditTrainer = false;
    this.isDeleteTrainer = false;
    this.selectedUser = null;
  }

}

   
