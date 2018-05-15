import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlierComponent } from './flier.component';

describe('FlierComponent', () => {
  let component: FlierComponent;
  let fixture: ComponentFixture<FlierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
