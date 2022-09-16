import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursevitalmodelComponent } from './nursevitalmodel.component';

describe('NursevitalmodelComponent', () => {
  let component: NursevitalmodelComponent;
  let fixture: ComponentFixture<NursevitalmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursevitalmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NursevitalmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
