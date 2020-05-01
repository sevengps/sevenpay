import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomoPayProcessingComponent } from './momo-pay-processing.component';

describe('MomoPayProcessingComponent', () => {
  let component: MomoPayProcessingComponent;
  let fixture: ComponentFixture<MomoPayProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomoPayProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomoPayProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
