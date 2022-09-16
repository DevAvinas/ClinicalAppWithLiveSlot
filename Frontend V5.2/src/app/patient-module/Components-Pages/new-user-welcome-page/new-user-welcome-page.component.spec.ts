import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserWelcomePageComponent } from './new-user-welcome-page.component';

describe('NewUserWelcomePageComponent', () => {
  let component: NewUserWelcomePageComponent;
  let fixture: ComponentFixture<NewUserWelcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserWelcomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
