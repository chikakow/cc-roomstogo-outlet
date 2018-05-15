import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponAppComponent } from './coupon-app.component';

describe('CouponAppComponent', () => {
  let component: CouponAppComponent;
  let fixture: ComponentFixture<CouponAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
