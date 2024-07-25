import { Component, EventEmitter, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ MatDialogModule,MatButton],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  @Output() confirm = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close(false);

  }

  onYesClick(): void {
    this.confirm.emit();
    this.dialogRef.close(true);
  }
}
