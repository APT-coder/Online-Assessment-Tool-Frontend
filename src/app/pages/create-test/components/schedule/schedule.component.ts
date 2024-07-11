import { Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component'; 
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component'; 

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatSelectModule, 
    MatCheckboxModule,
    SidebarComponent,
    ButtonActiveComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  @Input()
  questions: any[] = [];

  isSidebarCollapsed: boolean = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
 
  constructor(private _formBuilder: FormBuilder) {}

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
