import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsEditPatientEmergencyDetailsComponent } from './vitals-edit-patient-emergency-details.component';

describe('VitalsEditPatientEmergencyDetailsComponent', () => {
  let component: VitalsEditPatientEmergencyDetailsComponent;
  let fixture: ComponentFixture<VitalsEditPatientEmergencyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsEditPatientEmergencyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsEditPatientEmergencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
