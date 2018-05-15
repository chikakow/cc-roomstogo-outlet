import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfSaleEsComponent } from './terms-of-sale-es.component';

describe('TermsOfSaleEsComponent', () => {
  let component: TermsOfSaleEsComponent;
  let fixture: ComponentFixture<TermsOfSaleEsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfSaleEsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfSaleEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
