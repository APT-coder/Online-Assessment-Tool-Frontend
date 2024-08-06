import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mcq-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule],
  templateUrl: './mcq-form.component.html',
  styleUrl: './mcq-form.component.scss'
})
export class McqFormComponent {
  @Input()
  index!: number;
  @Output()
  mcqData = new EventEmitter<any>();

  mcqForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.mcqForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.createOption(),
        this.createOption(),
        this.createOption(),
        this.createOption()
      ])
    });

    this.mcqForm.valueChanges.subscribe(value => {
      this.mcqData.emit(value);
      console.log(value);
    });
  }

  get options(): FormArray {
    return this.mcqForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      option: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addOption() {
    this.options.push(this.createOption());
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onCheckboxChange(index: number) {
    this.options.controls.forEach((group, i) => {
      if (i !== index) {
        group.get('isCorrect')?.setValue(false);
      }
    });
  }
}
