import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
  imports: [
    MatStepperModule,
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
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  @Input()
  questions: any[] = [];
  assessmentId: string = '';
  secondFormGroup!: FormGroup;
  isSidebarCollapsed: boolean = false;
  batches: any[] = [];
  isFormSubmitted = false;
 
  constructor(private _formBuilder: FormBuilder, private userService: TrainermanagementService, private cdr: ChangeDetectorRef) {
    console.log(localStorage.getItem("assessmentId"));

    this.secondFormGroup = this._formBuilder.group({
      startDate: [new Date(), [ this.startDateValidator()]],
      endDate: [new Date(), [this.dateRangeValidator('startDate', 'endDate')]],
      assessmentDuration: ['00:00:00', Validators.required],
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
      (response: { isSuccess: any; result: any[]; }) => {
        if (response) {
          this.batches = response.result;
          console.log(this.batches);
        }
      });
  }

  // Validator for checking if the start date is in the future
  startDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      // Normalize the current date to 00:00:00 to avoid time comparison issues
      const normalizedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
      const startDate = new Date(control.value);
      // Normalize the start date to 00:00:00
      const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  
      console.log("Validating start date:", normalizedStartDate);
  
      if (normalizedStartDate < normalizedCurrentDate) {
        console.log("Invalid Start Date Detected");
        return { 'invalidStartDate': true };
      }
  
      return null;
    };
  }
  
  // Validator to check if the end date is after the start date
  dateRangeValidator(startDateKey: string, endDateKey: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const startDate = new Date(formGroup.get(startDateKey)?.value);
      const endDate = new Date(formGroup.get(endDateKey)?.value);
  
      // Initialize error object
      let errors = formGroup.errors || {};
  
      // Check if the startDate and endDate are valid Date objects
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        if (endDate < startDate) {
          console.log("Invalid Date Range Detected");
          errors['invalidDateRange'] = true; // Set error on form group
        } else {
          delete errors['invalidDateRange']; // Clear error if valid
        }
      }
  
      // Apply errors to the form group
      formGroup.setErrors(errors);
  
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }
  
  // Validator to check if the total duration matches the assessment duration
  timeDurationValidator(
    startDateControlName: string, 
    startTimeControlName: string, 
    endDateControlName: string, 
    endTimeControlName: string, 
    durationControlName: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const startDate = new Date(formGroup.get(startDateControlName)?.value);
      const startTime = formGroup.get(startTimeControlName)?.value;
      const endDate = new Date(formGroup.get(endDateControlName)?.value);
      const endTime = formGroup.get(endTimeControlName)?.value;
      const duration = formGroup.get(durationControlName)?.value;
      
      console.log("Start Date:", startDate, "Start Time:", startTime);
      console.log("End Date:", endDate, "End Time:", endTime);
      console.log("Assessment Duration:", duration);
    
      // If endDate is before startDate, no need to validate duration
      if (endDate < startDate) {
        console.log("Invalid Date Range Detected. Skipping Duration Validation.");
        return { 'invalidDateRange': true };// Return null since duration validation is not applicable
      }
      
      if (startDate && startTime && endDate && endTime && duration) {
        const startDateTime = this.combineDateAndTime(startDate, startTime);
        const endDateTime = this.combineDateAndTime(endDate, endTime);
        const assessmentDuration = this.parseDuration(duration);
    
        const actualDuration = endDateTime.getTime() - startDateTime.getTime();
    
        console.log("Actual Duration (ms):", actualDuration, "Expected Duration (ms):", assessmentDuration);
    
        if (actualDuration < assessmentDuration) {
          console.log("Invalid Duration Detected");
          return { 'invalidDuration': true };
        }
      }
    
      return null; // Return null if no validation errors are found
    };
  }
  
  

  // Helper method to combine date and time into a single Date object
  combineDateAndTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const result = new Date(date); 
    result.setHours(hours, minutes, 0);
    return result;
  }
  
  // Helper method to parse duration string (HH:mm:ss) to milliseconds
  parseDuration(duration: string): number {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
  }
  
  // Form submission method
  submitForm() {
    this.isFormSubmitted = true;
    this.secondFormGroup.markAllAsTouched();
    this.secondFormGroup.updateValueAndValidity(); 
    
    console.log("Start Date Control Errors:", this.secondFormGroup.get('startDate')?.errors);
    console.log("End Date Control Errors:", this.secondFormGroup.get('endDate')?.errors);
    console.log("Form Group Errors:", this.secondFormGroup.errors);

    if (this.secondFormGroup.valid) {
      console.log("Form is valid");
      // Proceed with form submission
    } else {
      console.log("Form is invalid");
      this.cdr.detectChanges();
    }
  }

  // Log form values for debugging
  logFormValues() {
    const formValues = this.secondFormGroup.value;
    const logData = {
      ...formValues,
      assessmentId: parseInt(localStorage.getItem("assessmentId") as string)
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
      status: 0, 
      canRandomizeQuestion: input.canRandomizeQuestion,
      canDisplayResult: input.canDisplayResult,
      canSubmitBeforeEnd: input.canSubmitBeforeEnd,
      Link: this.generateAssessmentLink(input.assessmentId)
    };
    return output;
  }

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
