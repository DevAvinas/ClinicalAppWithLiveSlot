import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientEmergencyDetailsComponent } from './edit-patient-emergency-details.component';

describe('EditPatientEmergencyDetailsComponent', () => {
  let component: EditPatientEmergencyDetailsComponent;
  let fixture: ComponentFixture<EditPatientEmergencyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientEmergencyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientEmergencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
