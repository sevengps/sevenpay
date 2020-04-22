import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeModalComponent } from './stripe-modal.component';

describe('StripeModalComponent', () => {
  let component: StripeModalComponent;
  let fixture: ComponentFixture<StripeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
