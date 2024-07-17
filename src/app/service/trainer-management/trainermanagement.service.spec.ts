import { TestBed } from '@angular/core/testing';

import { TrainermanagementService } from './trainermanagement.service';

describe('TrainermanagementService', () => {
  let service: TrainermanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainermanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
