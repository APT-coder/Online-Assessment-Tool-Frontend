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
    NgxMaterialTimepickerModule,
   ],
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
      assessmentId: [1, Validators.required],
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
      assessmentId : 1
    };
    const outputlog = this.transformAssessmentData(logData);
    return outputlog;
  }

  transformAssessmentData(input: any): any {
    const output = {
      batchId: this.convertBatchId(input.batchId),
      assessmentId: input.assessmentId,
      scheduledDate: input.scheduledDate,
      assessmentDuration: input.assessmentDuration,
      startDate: input.startDate,
      endDate: input.endDate,
      startTime: this.convertTimeToISO(input.startTime, input.scheduledDate),
      endTime: this.convertTimeToISO(input.endTime, input.scheduledDate),
      status: 0, // Assuming status is always 0 as per given format
      canRandomizeQuestion: input.canRandomizeQuestion,
      canDisplayResult: input.canDisplayResult,
      canSubmitBeforeEnd: input.canSubmitBeforeEnd,
      Link: this.generateAssessmentLink(input.assessmentId)
    };
    return output;
  }

  private convertBatchId(batchId: string): number {
    // Implement your logic to convert batchId to a number
    // For this example, let's assume a simple conversion
    const batchMapping: { [key: string]: number } = { 'one': 1, 'two': 2, 'three': 3 };
    return batchMapping[batchId] || 0;
  }

  private convertTimeToISO(time: string, referenceDate: string): string {
    const referenceDateObj = new Date(referenceDate);
    const [hours, minutes] = time.split(':').map(Number);
    referenceDateObj.setHours(hours, minutes);
    return referenceDateObj.toISOString();
  }

  generateAssessmentLink(assessmentId: number) {
    const link = "https://localhost:7200/tests/" + assessmentId.toString();
    return link;
  }
}
