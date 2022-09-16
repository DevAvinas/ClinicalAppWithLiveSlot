import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOldAppointmentsComponent } from './provider-old-appointments.component';

describe('ProviderOldAppointmentsComponent', () => {
  let component: ProviderOldAppointmentsComponent;
  let fixture: ComponentFixture<ProviderOldAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderOldAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOldAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
