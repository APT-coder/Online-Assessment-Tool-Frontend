import { Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component'; 
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 


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
    ButtonActiveComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  @Input()
  questions: any[] = [];
  assessmentId: string = '';
  secondFormGroup!: FormGroup;
  isSidebarCollapsed: boolean = false;
 
  constructor(private _formBuilder: FormBuilder) {
    console.log(localStorage.getItem("assessmentId"));

    this.secondFormGroup = this._formBuilder.group({
      batchId: ['', Validators.required],
      assessmentId: [0, Validators.required],
      scheduledDate: [new Date(), Validators.required],
      assessmentDuration: ['00:00:00', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      startTime: ['00:00', Validators.required],
      endTime: ['00:00', Validators.required],
      canRandomizeQuestion: [false],
      canDisplayResult: [false],
      canSubmitBeforeEnd: [false]
    });
  }

  logFormValues() {
    const formValues = this.secondFormGroup.value;
    const logData = {
      ...formValues,
      assessmentId : parseInt(localStorage.getItem("assessmentId") as string)
    };
    return logData;
  }

  onToggleSidebar(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
