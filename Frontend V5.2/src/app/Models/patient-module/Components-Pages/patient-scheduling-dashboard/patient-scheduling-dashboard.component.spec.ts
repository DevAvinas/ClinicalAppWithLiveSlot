import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSchedulingDashboardComponent } from './patient-scheduling-dashboard.component';

describe('PatientSchedulingDashboardComponent', () => {
  let component: PatientSchedulingDashboardComponent;
  let fixture: ComponentFixture<PatientSchedulingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSchedulingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSchedulingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
