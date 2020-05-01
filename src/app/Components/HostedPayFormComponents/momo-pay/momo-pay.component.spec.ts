import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomoPayComponent } from './momo-pay.component';

describe('MomoPayComponent', () => {
  let component: MomoPayComponent;
  let fixture: ComponentFixture<MomoPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomoPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomoPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
