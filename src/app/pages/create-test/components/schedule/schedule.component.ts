import { Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormGroup,ValidatorFn, AbstractControl } from '@angular/forms';
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
import { CommonModule } from '@angular/common';
import { TrainermanagementService } from '../../../../service/trainer-management/trainermanagement.service';


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
    CommonModule
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
  batches: any[] = [];
 
  constructor(private _formBuilder: FormBuilder, private userService: TrainermanagementService) {
    console.log(localStorage.getItem("assessmentId"));

    this.secondFormGroup = this._formBuilder.group({
      batchId: ['', Validators.required],
      assessmentId: [0, Validators.required],
      scheduledDate: [new Date(), Validators.required],
      assessmentDuration: ['00:00:00', Validators.required],
      startDate: [new Date(),  [Validators.required, this.startDateValidator()]],
      endDate: [new Date(), Validators.required],
      startTime: ['00:00', Validators.required],
      endTime: ['00:00', Validators.required],
      canRandomizeQuestion: [false],
      canDisplayResult: [false],
      canSubmitBeforeEnd: [false]
    }, { 
      validators: [
      this.dateRangeValidator('startDate', 'endDate'),
       this.timeDurationValidator('startDate', 'startTime', 'endDate', 'endTime', 'assessmentDuration')
       ]
    });
    this.loadBatches();
  }

  loadBatches(): void {
    this.userService.getBatches().subscribe(
      (      response: { isSuccess: any; result: any[]; }) => {
        if (response) {
          this.batches = response.result;
          console.log(this.batches);
        }
      });
  }

  dateRangeValidator(startDateControlName: string, endDateControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const startDate = formGroup.get(startDateControlName)?.value;
      const endDate = formGroup.get(endDateControlName)?.value;

      if (startDate && endDate && endDate < startDate) {
        return { 'invalidDateRange': true };
      }

      return null;
    };
  }

  startDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const startDate = new Date(control.value);

      if (startDate < currentDate) {
        return { 'invalidStartDate': true };
      }

      return null;
    };
  }

  timeDurationValidator(startDateControlName: string, startTimeControlName: string, endDateControlName: string, endTimeControlName: string, durationControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const startDate = new Date(formGroup.get(startDateControlName)?.value);
      const startTime = formGroup.get(startTimeControlName)?.value;
      const endDate = new Date(formGroup.get(endDateControlName)?.value);
      const endTime = formGroup.get(endTimeControlName)?.value;
      const duration = formGroup.get(durationControlName)?.value;
  
      if (startDate && startTime && endDate && endTime && duration) {
        const startDateTime = this.combineDateAndTime(startDate, startTime);
        const endDateTime = this.combineDateAndTime(endDate, endTime);
        const assessmentDuration = this.parseDuration(duration);
  
        const actualDuration = endDateTime.getTime() - startDateTime.getTime();

        if (actualDuration < assessmentDuration) {
          console.log("Validation failed: Actual duration is less than assessment duration");
          return { 'invalidDuration': true };
        }
      }
  
      return null;
    };
  }
  
  combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes, 0);
    return date;
  }
  
  parseDuration(duration: string): number {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
  }
  
  submitForm() {
    this.secondFormGroup.markAllAsTouched();
    if (this.secondFormGroup.valid) {
      // Proceed with form submission
    }
  }
  

  logFormValues() {
    const formValues = this.secondFormGroup.value;
    const logData = {
      ...formValues,
      assessmentId : parseInt(localStorage.getItem("assessmentId") as string)
    };
    const outputlog = this.transformAssessmentData(logData);
    return outputlog;
  }

  transformAssessmentData(input: any): any {
    const output = {
      batchId: input.batchId,
      assessmentId: parseInt(localStorage.getItem("assessmentId") as string),
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

  // private convertBatchId(batchId: string): number {
  //   const batchMapping: { [key: string]: number } = { 'one': 1, 'two': 2, 'three': 3 };
  //   return batchMapping[batchId] || 0;
  // }

  private convertTimeToISO(time: string, referenceDate: string): string {
    const referenceDateObj = new Date(referenceDate);
    const [hours, minutes] = time.split(':').map(Number);
    referenceDateObj.setHours(hours, minutes);
    return referenceDateObj.toISOString();
  }

  generateAssessmentLink(assessmentId: number) {
    const link = "http://localhost:4200/tests/" + assessmentId.toString();
    return link;
  }
}