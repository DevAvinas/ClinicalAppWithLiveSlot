import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalEditpatientDemoDetailsComponent } from './vital-editpatient-demo-details.component';

describe('VitalEditpatientDemoDetailsComponent', () => {
  let component: VitalEditpatientDemoDetailsComponent;
  let fixture: ComponentFixture<VitalEditpatientDemoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalEditpatientDemoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalEditpatientDemoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
