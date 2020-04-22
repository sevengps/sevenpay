import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTransactionComponent } from './success-transaction.component';

describe('SuccessTransactionComponent', () => {
  let component: SuccessTransactionComponent;
  let fixture: ComponentFixture<SuccessTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
