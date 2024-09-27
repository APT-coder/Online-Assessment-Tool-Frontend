// src/app/services/doc-parser/word-parser.service.ts
import { Injectable } from '@angular/core';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class WordParserService {
  constructor() { }

  async readWordFile(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      return result.value; // The HTML content
    } catch (error) {
      console.error('Error reading the Word file:', error);
      throw error;
    }
  }
  
  async readExcelFile(file: File): Promise<any[]> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Get the first sheet name
      const sheet = workbook.Sheets[sheetName]; // Get the first sheet
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to JSON array
      return data; // The Excel content as JSON array
    } catch (error) {
      console.error('Error reading the Excel file:', error);
      throw error;
    }
  }
}
