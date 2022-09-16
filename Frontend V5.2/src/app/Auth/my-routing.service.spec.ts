import { TestBed } from '@angular/core/testing';

import { MyRoutingService } from './my-routing.service';

describe('MyRoutingService', () => {
  let service: MyRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
