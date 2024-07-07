import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ButtonActiveComponent } from "../../ui/buttons/button-active/button-active.component";
import { RolecreationCardComponent } from "./components/rolecreation-card/rolecreation-card.component";
import { AccountcreationModalComponent } from "./components/accountcreation-modal/accountcreation-modal.component";
import { TrainerTableComponent } from "./components/trainer-table/trainer-table.component";


@Component({
    selector: 'app-trainer-management',
    standalone: true,
    templateUrl: './trainer-management.component.html',
    styleUrl: './trainer-management.component.scss',
    imports: [
        RouterOutlet,
        FontAwesomeModule,
        CommonModule,
        SidebarComponent,
        ButtonActiveComponent,
        RolecreationCardComponent,
        AccountcreationModalComponent,
        TrainerTableComponent
    ]
})
export class TrainerManagementComponent {
  isAddTrainer: boolean = false;
  isCardVisible: boolean = false;
  isSidebarCollapsed: boolean = false;


  ShowTrainer() {
    this.isAddTrainer = !this.isAddTrainer;
  }

  toggleCard() {
    this.isCardVisible = !this.isCardVisible;
  }

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

}
