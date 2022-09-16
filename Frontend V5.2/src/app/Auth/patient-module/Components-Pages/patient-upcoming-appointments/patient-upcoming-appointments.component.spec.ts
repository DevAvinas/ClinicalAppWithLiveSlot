import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpcomingAppointmentsComponent } from './patient-upcoming-appointments.component';

describe('PatientUpcomingAppointmentsComponent', () => {
  let component: PatientUpcomingAppointmentsComponent;
  let fixture: ComponentFixture<PatientUpcomingAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUpcomingAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUpcomingAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
