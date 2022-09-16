import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderOldVitaltableComponent } from './provider-old-vitaltable.component';

describe('ProviderOldVitaltableComponent', () => {
  let component: ProviderOldVitaltableComponent;
  let fixture: ComponentFixture<ProviderOldVitaltableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderOldVitaltableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderOldVitaltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
