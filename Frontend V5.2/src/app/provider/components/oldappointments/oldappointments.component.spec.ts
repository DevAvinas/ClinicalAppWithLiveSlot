import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldappointmentsComponent } from './oldappointments.component';

describe('OldappointmentsComponent', () => {
  let component: OldappointmentsComponent;
  let fixture: ComponentFixture<OldappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldappointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
