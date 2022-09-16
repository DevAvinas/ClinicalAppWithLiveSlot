import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataCollectionAppointmentComponent } from './edit-data-collection-appointment.component';

describe('EditDataCollectionAppointmentComponent', () => {
  let component: EditDataCollectionAppointmentComponent;
  let fixture: ComponentFixture<EditDataCollectionAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDataCollectionAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataCollectionAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
