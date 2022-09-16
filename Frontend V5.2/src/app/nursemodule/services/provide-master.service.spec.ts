import { TestBed } from '@angular/core/testing';

import { ProvideMasterService } from './provide-master.service';

describe('ProvideMasterService', () => {
  let service: ProvideMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvideMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
