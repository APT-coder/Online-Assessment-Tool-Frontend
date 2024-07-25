import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ButtonActiveComponent } from "../../ui/buttons/button-active/button-active.component";
import { TrainermanagementService } from '../../service/trainer-management/trainermanagement.service';
import { Role } from '../../../models/role.interface';
import { RolecreationCardComponent } from "./components/rolecreation-card/rolecreation-card.component";
import { AccountcreationModalComponent } from "./components/accountcreation-modal/accountcreation-modal.component";
import { TrainerTableComponent } from "./components/trainer-table/trainer-table.component";
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { ApiEndpointService } from '../../service/api-service/api-endpoint.service';

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
  jsonData: any;

  constructor(private apiService: TrainermanagementService, private userService: TrainermanagementService, private apiEndpointService: ApiEndpointService) {}

  ngOnInit() {
    this.apiEndpointService.loadEndpoints().subscribe();
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

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;

  onFileSelect(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        let workbook;
        if (fileExtension === 'csv') {
          const csvData = new TextDecoder('utf-8').decode(data);
          workbook = XLSX.read(csvData, { type: 'string' });
        } else {
          workbook = XLSX.read(data, { type: 'array' });
        }

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.processData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  processData(data: any) {
    const headers = data[0] as string[];
    const rows = data.slice(1);
    this.jsonData = rows.map((row: any[]) => {
      let user: any = {};
      headers.forEach((header, index) => {
        user[header] = row[index];
      });
      return this.transformToJson(user);
    });
    this.jsonData.forEach((user: any) => {
      this.addTraineeAccount(user);
    });
  }

  transformToJson(user: any) {
    return {
      createUserDTO: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        isAdmin: false,
        userType: 2,
        uuid: uuidv4()
      },
      trainerDTO: {
        joinedOn: new Date().toISOString(),
        password: "",
        roleId: 0
      },
      traineeDTO: {
        joinedOn: new Date().toISOString(),
        batchId: parseInt(user.batchid, 10)
      },
      batchIds: []
    };
  }

  addTraineeAccount(user: any){
    this.userService.createUser(user).subscribe(
      () => {
        console.log("User added successfully");
      },
      (error: any) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
