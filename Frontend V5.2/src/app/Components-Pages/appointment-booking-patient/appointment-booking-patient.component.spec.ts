import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBookingPatientComponent } from './appointment-booking-patient.component';

describe('AppointmentBookingPatientComponent', () => {
  let component: AppointmentBookingPatientComponent;
  let fixture: ComponentFixture<AppointmentBookingPatientComponent>;
//comment
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBookingPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookingPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
