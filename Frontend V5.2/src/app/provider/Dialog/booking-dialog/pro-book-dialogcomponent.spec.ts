import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProBookDialogComponent } from './pro-book-dialog.component';

describe('ProBookDialogComponent', () => {
  let component: ProBookDialogComponent;
  let fixture: ComponentFixture<ProBookDialogComponent>;
//comment
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProBookDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
