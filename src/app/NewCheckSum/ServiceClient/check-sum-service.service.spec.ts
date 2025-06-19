import { TestBed } from '@angular/core/testing';

import { CheckSumServiceService } from './check-sum-service.service';

describe('CheckSumServiceService', () => {
  let service: CheckSumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckSumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
