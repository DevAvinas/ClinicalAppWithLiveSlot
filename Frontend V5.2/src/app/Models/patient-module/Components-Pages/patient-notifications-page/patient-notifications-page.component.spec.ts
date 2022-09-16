import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNotificationsPageComponent } from './patient-notifications-page.component';

describe('PatientNotificationsPageComponent', () => {
  let component: PatientNotificationsPageComponent;
  let fixture: ComponentFixture<PatientNotificationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientNotificationsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNotificationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
