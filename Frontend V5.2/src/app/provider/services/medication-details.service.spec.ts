import { TestBed } from '@angular/core/testing';

import { MedicationDetailsService } from './medication-details.service';

describe('MedicationDetailsService', () => {
  let service: MedicationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
