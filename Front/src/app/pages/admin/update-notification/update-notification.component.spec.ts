import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotificationComponent } from './update-notification.component';

describe('UpdateNotificationComponent', () => {
  let component: UpdateNotificationComponent;
  let fixture: ComponentFixture<UpdateNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNotificationComponent]
    });
    fixture = TestBed.createComponent(UpdateNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
