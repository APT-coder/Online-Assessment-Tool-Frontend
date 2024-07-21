import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../../ui/buttons/button-inactive/button-inactive.component';
import { ButtonNormalComponent } from '../../../../ui/buttons/button-normal/button-normal.component';
import { CommonModule } from '@angular/common';
import { WordParserService } from '../../../../service/doc-parser/word-parser.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadSuccessComponent } from '../upload-success/upload-success.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ButtonActiveComponent, ButtonInactiveComponent, ButtonNormalComponent, CommonModule, UploadSuccessComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  fileName: string | undefined;
  uploaded: boolean = false;

  constructor(
    private wordParserService: WordParserService,
    private dialog: MatDialog
  ) {}

  async onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.fileName = file.name;
      this.uploaded = false;
    }
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const htmlContent = await this.wordParserService.readWordFile(file);
        console.log('HTML Content:', htmlContent); 
        localStorage.setItem("htmlContent", htmlContent);       
        this.uploaded = true;
      } catch (error) {
        console.error('Error parsing the Word file:', error);
      }
    } else {
      console.log('Invalid file type or no file dropped.');
    }
  }

  async uploadFile() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const htmlContent = await this.wordParserService.readWordFile(file);
        console.log('HTML Content:', htmlContent);
        localStorage.setItem("htmlContent", htmlContent);
        this.uploaded = true;
      } catch (error) {
        console.error('Error parsing the Word file:', error);
      }
    } else {
      console.log('No valid file selected.');
    }
  }

  @Output() uploadSuccess = new EventEmitter<void>();

  prepareTestAndCloseModal(){
    this.uploadSuccess.emit();
  }
}
