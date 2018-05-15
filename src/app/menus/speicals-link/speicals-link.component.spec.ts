import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeicalsLinkComponent } from './speicals-link.component';

describe('SpeicalsLinkComponent', () => {
  let component: SpeicalsLinkComponent;
  let fixture: ComponentFixture<SpeicalsLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeicalsLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeicalsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
