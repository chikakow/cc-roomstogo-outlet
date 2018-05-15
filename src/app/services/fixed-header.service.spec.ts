import { TestBed, inject } from '@angular/core/testing';

import { FixedHeaderService } from './fixed-header.service';

describe('FixedHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixedHeaderService]
    });
  });

  it('should be created', inject([FixedHeaderService], (service: FixedHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
