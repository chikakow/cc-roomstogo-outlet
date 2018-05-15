import { TestBed, inject } from '@angular/core/testing';

import { CookieWrapperService } from './cookie.service';

describe('CookieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieWrapperService]
    });
  });

  it('should be created', inject([CookieWrapperService], (service: CookieWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
