import { TestBed } from '@angular/core/testing';

import { TrainerDashboardService } from './trainer-dashboard.service';

describe('TrainerDashboardService', () => {
  let service: TrainerDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
