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
  isCardVisible: boolean = false;
  isSidebarCollapsed: boolean = false;
  selectedRole: Role = { id: 0, roleName: '', permissionIds: [] };
  isEditMode: boolean = false;
  isModalVisible: boolean = false;

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

  openRoleCreationModal() {
    this.isModalVisible = true;
  }

  closeRoleCreationModal() {
    this.isModalVisible = false;
  }

  editRole(role: Role) {
    this.selectedRole = { ...role };
    this.isEditMode = true;
    this.openRoleCreationModal();
  }

  onCancelRoleCreation() {
    this.closeRoleCreationModal();
    this.selectedRole = { id: 0, roleName: '', permissionIds: [] };
  }

  onRoleSaved() {
    this.closeRoleCreationModal();
    // Optionally reload data or perform other actions after role is saved
  }

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  isAddTrainer: boolean = false;
  isEditTrainer: boolean = false;
  isDeleteTrainer: boolean = false;
  selectedUser: any = null;

  addTrainer() {
    this.isAddTrainer = true;
    this.selectedUser = null;
  }

  editTrainer(user: any) {
    this.isEditTrainer = true;
    this.selectedUser = user;
  }

  deleteTrainer(user: any) {
    this.isDeleteTrainer = true;
    this.selectedUser = user;
  }

  closeModal() {
    this.isAddTrainer = false;
    this.isEditTrainer = false;
    this.isDeleteTrainer = false;
    this.selectedUser = null;
  }
}
