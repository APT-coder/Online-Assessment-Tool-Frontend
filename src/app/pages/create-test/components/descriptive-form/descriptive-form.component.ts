import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-descriptive-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './descriptive-form.component.html',
  styleUrl: './descriptive-form.component.scss'
})
export class DescriptiveFormComponent {
  @Input()
  index!: number;
  descriptiveForm: FormGroup;
  @Output()
  descData = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.descriptiveForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });

    this.descriptiveForm.valueChanges.subscribe(value => {
      this.descData.emit(value);
    });
  }

  deleteQuestion() {
    // Logic to delete the question
  }
}
