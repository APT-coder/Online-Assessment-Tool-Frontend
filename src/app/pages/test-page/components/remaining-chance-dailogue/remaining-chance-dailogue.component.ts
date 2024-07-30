import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remaining-chance-dailogue',
  standalone: true,
  imports: [MatDialogModule,MatButton],
  templateUrl: './remaining-chance-dailogue.component.html',
  styleUrl: './remaining-chance-dailogue.component.scss'
})
export class RemainingChanceDailogueComponent {
  constructor(public dialogRef: MatDialogRef<RemainingChanceDailogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  @Output() confirm = new EventEmitter<void>();

  onNoClick(): void {
    this.dialogRef.close(false);

  }

  onYesClick(): void {
    this.confirm.emit();
    this.dialogRef.close(true);
  }
}
