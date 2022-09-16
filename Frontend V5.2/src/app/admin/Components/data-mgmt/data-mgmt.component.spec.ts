import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMgmtComponent } from './data-mgmt.component';

describe('DataMgmtComponent', () => {
  let component: DataMgmtComponent;
  let fixture: ComponentFixture<DataMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
