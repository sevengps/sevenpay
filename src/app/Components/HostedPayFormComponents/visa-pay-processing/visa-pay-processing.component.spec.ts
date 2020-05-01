import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaPayProcessingComponent } from './visa-pay-processing.component';

describe('VisaPayProcessingComponent', () => {
  let component: VisaPayProcessingComponent;
  let fixture: ComponentFixture<VisaPayProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaPayProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaPayProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
