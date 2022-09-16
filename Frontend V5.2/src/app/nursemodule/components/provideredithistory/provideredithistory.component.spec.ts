import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideredithistoryComponent } from './provideredithistory.component';

describe('ProvideredithistoryComponent', () => {
  let component: ProvideredithistoryComponent;
  let fixture: ComponentFixture<ProvideredithistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvideredithistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideredithistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
