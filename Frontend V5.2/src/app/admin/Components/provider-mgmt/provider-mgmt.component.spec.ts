import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMgmtComponent } from './provider-mgmt.component';

describe('ProviderMgmtComponent', () => {
  let component: ProviderMgmtComponent;
  let fixture: ComponentFixture<ProviderMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
