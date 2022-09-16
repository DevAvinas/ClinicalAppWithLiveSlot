import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationproviderComponent } from './notificationprovider.component';

describe('NotificationproviderComponent', () => {
  let component: NotificationproviderComponent;
  let fixture: ComponentFixture<NotificationproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationproviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
