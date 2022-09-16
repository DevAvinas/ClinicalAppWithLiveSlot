import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingconfirmedappointmentsComponent } from './upcomingconfirmedappointments.component';

describe('UpcomingconfirmedappointmentsComponent', () => {
  let component: UpcomingconfirmedappointmentsComponent;
  let fixture: ComponentFixture<UpcomingconfirmedappointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingconfirmedappointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingconfirmedappointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
