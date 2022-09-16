import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEmergencyDetailsComponent } from './patient-emergency-details.component';

describe('PatientEmergencyDetailsComponent', () => {
  let component: PatientEmergencyDetailsComponent;
  let fixture: ComponentFixture<PatientEmergencyDetailsComponent>;
//comment
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEmergencyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEmergencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
