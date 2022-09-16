import { TestBed } from '@angular/core/testing';

import { PatientModuleGuard } from './patient-module.guard';

describe('PatientModuleGuard', () => {
  let guard: PatientModuleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatientModuleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
