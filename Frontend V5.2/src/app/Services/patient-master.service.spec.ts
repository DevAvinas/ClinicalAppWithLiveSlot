import { TestBed } from '@angular/core/testing';

import { PatientMasterService } from './patient-master.service';

describe('PatientMasterService', () => {
  let service: PatientMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
