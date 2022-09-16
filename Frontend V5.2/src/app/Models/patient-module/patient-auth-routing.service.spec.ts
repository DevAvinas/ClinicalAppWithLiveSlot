import { TestBed } from '@angular/core/testing';

import { PatientAuthRoutingService } from './patient-auth-routing.service';

describe('PatientAuthRoutingService', () => {
  let service: PatientAuthRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientAuthRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
