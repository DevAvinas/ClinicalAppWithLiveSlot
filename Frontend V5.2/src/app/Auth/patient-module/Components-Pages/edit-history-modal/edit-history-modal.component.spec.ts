import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHistoryModalComponent } from './edit-history-modal.component';

describe('EditHistoryModalComponent', () => {
  let component: EditHistoryModalComponent;
  let fixture: ComponentFixture<EditHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHistoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
