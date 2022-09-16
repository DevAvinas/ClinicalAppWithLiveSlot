import { TestBed } from '@angular/core/testing';

import { AppointmentEditHistoryService } from './appointment-edit-history.service';

describe('AppointmentEditHistoryService', () => {
  let service: AppointmentEditHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentEditHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
