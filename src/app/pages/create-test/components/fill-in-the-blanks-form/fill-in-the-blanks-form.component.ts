import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fill-in-the-blanks-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './fill-in-the-blanks-form.component.html',
  styleUrl: './fill-in-the-blanks-form.component.scss'
})
export class FillInTheBlanksFormComponent {
  @Input()
  index!: number;
  @Output()
  fillData = new EventEmitter<any>();
  fillInTheBlanksForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fillInTheBlanksForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });

    this.fillInTheBlanksForm.valueChanges.subscribe(value => {
      this.fillData.emit(value);
    });
  }

  deleteQuestion() {
    // Logic to delete the question
  }
}
