import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBodyComponent } from './payment-body.component';

describe('PaymentBodyComponent', () => {
  let component: PaymentBodyComponent;
  let fixture: ComponentFixture<PaymentBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
