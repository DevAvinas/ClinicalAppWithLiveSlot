import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalmodalComponent } from './vitalmodal.component';

describe('VitalmodalComponent', () => {
  let component: VitalmodalComponent;
  let fixture: ComponentFixture<VitalmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
