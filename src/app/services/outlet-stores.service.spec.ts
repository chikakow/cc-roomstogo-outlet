import { TestBed, inject } from '@angular/core/testing';

import { OutletStoresService } from './outlet-stores.service';

describe('OutletStoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutletStoresService]
    });
  });

  it('should be created', inject([OutletStoresService], (service: OutletStoresService) => {
    expect(service).toBeTruthy();
  }));
});
