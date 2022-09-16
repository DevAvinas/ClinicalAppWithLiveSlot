import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDataCollectionAppointmentComponent } from './book-data-collection-appointment.component';

describe('BookDataCollectionAppointmentComponent', () => {
  let component: BookDataCollectionAppointmentComponent;
  let fixture: ComponentFixture<BookDataCollectionAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDataCollectionAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDataCollectionAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
