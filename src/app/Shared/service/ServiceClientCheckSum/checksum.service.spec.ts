import { TestBed } from '@angular/core/testing';

import { ChecksumService } from './checksum.service';

describe('ChecksumService', () => {
  let service: ChecksumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecksumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
