// src/app/services/doc-parser/word-parser.service.ts
import { Injectable } from '@angular/core';
import mammoth from 'mammoth';

@Injectable({
  providedIn: 'root'
})
export class WordParserService {
  constructor() { }

  async readWordFile(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      console.log('HTML Conversion Result:', result.value); // Debug log
      return result.value; // The HTML content
    } catch (error) {
      console.error('Error reading the Word file:', error);
      throw error;
    }
  }
}
