import { TestBed } from '@angular/core/testing';

import { PerformanceDetailsService } from './performance-details.service';

describe('PerformanceDetailsService', () => {
  let service: PerformanceDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
