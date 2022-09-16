import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAppointmentPagesComponent } from './provider-appointment-pages.component';

describe('ProviderAppointmentPagesComponent', () => {
  let component: ProviderAppointmentPagesComponent;
  let fixture: ComponentFixture<ProviderAppointmentPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAppointmentPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAppointmentPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
