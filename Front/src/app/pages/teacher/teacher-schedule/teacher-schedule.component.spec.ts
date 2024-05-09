import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherScheduleComponent } from './teacher-schedule.component';

describe('TeacherScheduleComponent', () => {
  let component: TeacherScheduleComponent;
  let fixture: ComponentFixture<TeacherScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherScheduleComponent]
    });
    fixture = TestBed.createComponent(TeacherScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
