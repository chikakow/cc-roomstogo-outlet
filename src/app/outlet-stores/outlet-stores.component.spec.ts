import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletStoresComponent } from './outlet-stores.component';

describe('OutletStoresComponent', () => {
  let component: OutletStoresComponent;
  let fixture: ComponentFixture<OutletStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
