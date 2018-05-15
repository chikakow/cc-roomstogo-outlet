import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletPhraseComponent } from './outlet-phrase.component';

describe('OutletPhraseComponent', () => {
  let component: OutletPhraseComponent;
  let fixture: ComponentFixture<OutletPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletPhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
