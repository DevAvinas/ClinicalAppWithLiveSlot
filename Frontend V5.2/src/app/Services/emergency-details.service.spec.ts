import { TestBed } from '@angular/core/testing';

import { EmergencyDetailsService } from './emergency-details.service';

describe('EmergencyDetailsService', () => {
  let service: EmergencyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
