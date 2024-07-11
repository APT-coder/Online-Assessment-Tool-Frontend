import { TestBed } from '@angular/core/testing';
import { WordParserService } from './word-parser.service';
import mammoth from 'mammoth';

describe('WordParserService', () => {
  let service: WordParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read and convert a Word file to HTML', async () => {
    const mockFile = new File(["dummy content"], "dummy.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

    spyOn(mockFile, 'arrayBuffer').and.returnValue(Promise.resolve(new ArrayBuffer(8)));
    spyOn(mammoth, 'convertToHtml').and.returnValue(Promise.resolve({ value: '<p>Mock HTML</p>', messages: [] }));

    const result = await service.readWordFile(mockFile);
    
    expect(result).toBe('<p>Mock HTML</p>');
    expect(mockFile.arrayBuffer).toHaveBeenCalled();
    expect(mammoth.convertToHtml).toHaveBeenCalledWith({ arrayBuffer: jasmine.any(ArrayBuffer) });
  });

  it('should handle errors during file reading and conversion', async () => {
    const mockFile = new File(["dummy content"], "dummy.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

    spyOn(mockFile, 'arrayBuffer').and.returnValue(Promise.reject('Failed to read array buffer'));
    spyOn(mammoth, 'convertToHtml').and.returnValue(Promise.resolve({ value: '<p>Mock HTML</p>', messages: [] }));

    try {
      await service.readWordFile(mockFile);
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBe('Failed to read array buffer');
      expect(mockFile.arrayBuffer).toHaveBeenCalled();
      expect(mammoth.convertToHtml).not.toHaveBeenCalled();
    }
  });
});
