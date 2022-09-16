import { TestBed } from '@angular/core/testing';

import { DiagnosisMasterService } from './diagnosis-master.service (1)';

describe('DiagnosisMasterService', () => {
  let service: DiagnosisMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosisMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
