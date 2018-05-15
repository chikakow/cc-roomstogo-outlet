import { TestBed, inject } from '@angular/core/testing';

import { FlierService } from './flier.service';

describe('FlierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlierService]
    });
  });

  it('should be created', inject([FlierService], (service: FlierService) => {
    expect(service).toBeTruthy();
  }));
});
