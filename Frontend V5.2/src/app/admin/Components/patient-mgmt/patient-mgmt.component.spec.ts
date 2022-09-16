import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMgmtComponent } from './patient-mgmt.component';

describe('PatientMgmtComponent', () => {
  let component: PatientMgmtComponent;
  let fixture: ComponentFixture<PatientMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
