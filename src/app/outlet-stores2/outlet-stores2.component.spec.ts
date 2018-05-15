import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletStores2Component } from './outlet-stores2.component';

describe('OutletStores2Component', () => {
  let component: OutletStores2Component;
  let fixture: ComponentFixture<OutletStores2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletStores2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletStores2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
