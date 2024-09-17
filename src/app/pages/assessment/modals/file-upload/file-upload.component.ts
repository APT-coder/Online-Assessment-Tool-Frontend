import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonActiveComponent } from '../../../../ui/buttons/button-active/button-active.component';
import { ButtonInactiveComponent } from '../../../../ui/buttons/button-inactive/button-inactive.component';
import { ButtonNormalComponent } from '../../../../ui/buttons/button-normal/button-normal.component';
import { CommonModule } from '@angular/common';
import { WordParserService } from '../../../../service/doc-parser/word-parser.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadSuccessComponent } from '../upload-success/upload-success.component';
import { DialogModule } from 'primeng/dialog';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ButtonActiveComponent, ButtonInactiveComponent, ButtonNormalComponent, CommonModule, UploadSuccessComponent,DialogModule, ButtonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  fileName: string | undefined;
  uploaded: boolean = false;
  visibleTemplatePreview = false;
  wordTemplateContent: any;
  isWordPreview: boolean = true;
  excelTemplateContent: string = '';
  isExcel: boolean = false;

  constructor(
    private wordParserService: WordParserService,
    private dialog: MatDialog,
    private http: HttpClient
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
        localStorage.removeItem("htmlContent");
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
    if (file) {
      if(file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        try {
          const htmlContent = await this.wordParserService.readWordFile(file);
          console.log('HTML Content:', htmlContent);
          localStorage.removeItem("questionContent");
          localStorage.removeItem("htmlContent");
          localStorage.setItem("htmlContent", htmlContent);
          this.uploaded = true;
        } catch (error) {
          console.error('Error parsing the Word file:', error);
        }
      }
      else if(file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.type === 'application/vnd.ms-excel'){
        try {
          const questionContent = await this.wordParserService.readExcelFile(file);
          console.log('File Content', questionContent);
          localStorage.removeItem("questionContent");
          localStorage.removeItem("htmlContent");
          localStorage.setItem("questionContent", JSON.stringify(questionContent));
          this.uploaded = true;
        } catch (error) {
          console.error('Error parsing the Excel file:', error);
        }
      }
    } 
    else {
      console.log('No valid file selected.');
    }
  }

  @Output() uploadSuccess = new EventEmitter<void>();

  prepareTestAndCloseModal(){
    this.uploadSuccess.emit();
  }
  closeUploadModal(){
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }
  onToggleChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.isExcel = inputElement.checked;
    this.isWordPreview = !inputElement.checked;
    if (!this.isWordPreview) {
      this.loadExcelFile();
    }
  }

  getPreviewHeading(): string {
    return this.isWordPreview ? 'Word Preview Template (.docx)' : 'Excel Preview Template (.xlsx)';
  }

  loadExcelFile(): void {
    const filePath = 'assets/Assessment Template.xlsx';

    this.http.get(filePath, { responseType: 'arraybuffer' }).subscribe(data => {
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.excelTemplateContent = XLSX.utils.sheet_to_html(worksheet);
      const startIndex = this.excelTemplateContent.indexOf('<title>');
      const endIndex = this.excelTemplateContent.indexOf('</title>') + '</title>'.length;
      this.excelTemplateContent = this.excelTemplateContent.slice(0, startIndex) + this.excelTemplateContent.slice(endIndex);
      console.log(this.excelTemplateContent);    
    });
  }


  downloadTemplate() {
    const isExcel = this.isExcel;
    const wordTemplateUrl = 'assets/Assessment_Template.docx';
    const excelTemplateUrl = 'assets/Assessment Template.xlsx';
    const link = document.createElement('a');
    link.href = isExcel ? excelTemplateUrl : wordTemplateUrl;
    link.download = isExcel ? 'Assessment_Template.xlsx' : 'Assessment_Template.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async openTemplatePreview() {
    this.uploaded = true;
    this.visibleTemplatePreview = true;

    try {
      await this.readWordFile("assets/Assessment_Template.docx");
      console.log(this.wordTemplateContent);
    } catch (error) {
      console.error('Error processing template preview:', error);
    }
  }

  private async readWordFile(filePath: string): Promise<void> {
    try {
      const arrayBuffer = await this.http.get(filePath, { responseType: 'arraybuffer' }).toPromise();
      await this.processDocxFile(arrayBuffer);
    } catch (error) {
      console.error('Error loading file:', error);
      throw error;
    }
  }

  private async processDocxFile(arrayBuffer: any): Promise<void> {
    try {
      const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
      this.wordTemplateContent = result.value;
    } catch (err) {
      console.error('Error reading .docx file:', err);
      throw err;
    }
  }
}
