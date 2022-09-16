import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbouthospitalComponent } from './abouthospital.component';

describe('AbouthospitalComponent', () => {
  let component: AbouthospitalComponent;
  let fixture: ComponentFixture<AbouthospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbouthospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbouthospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
