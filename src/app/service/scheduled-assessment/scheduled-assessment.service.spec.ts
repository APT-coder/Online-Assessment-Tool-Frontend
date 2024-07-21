import { TestBed } from '@angular/core/testing';

import { ScheduledAssessmentService } from './scheduled-assessment.service';

describe('ScheduledAssessmentService', () => {
  let service: ScheduledAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
