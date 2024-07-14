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
    isAddTrainer: boolean = false;
    isCardVisible: boolean = false;
    isSidebarCollapsed: boolean = false;
    isEditMode: boolean = false;
    selectedRole: Role = { roleName: '', permissions: [] };
    roles: Role[] = [];

    constructor(private apiService: TrainermanagementService) {}

    ngOnInit() {
        this.loadRoles(); // Load roles when the component initializes
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
            this.selectedRole = { roleName: '', permissions: [] }; // Clear the selected role for new role creation
        }
    }

    editRole(role: Role) {
        this.selectedRole = { ...role }; // Set the selected role (make a copy to avoid reference issues)
        this.isCardVisible = true; // Show the role creation card
        this.isEditMode = true; // Set the edit mode
    }

    onToggleSidebar(collapsed: boolean) {
        this.isSidebarCollapsed = collapsed;
    }

    onCancelRoleCreation() {
        this.isCardVisible = false;
        this.selectedRole = { roleName: '', permissions: [] }; // Reset selected role for cancellation
    }

    onRoleSaved() {
        this.isCardVisible = false;
        this.loadRoles(); // Reload roles after saving
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
}
