import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassComponent } from './teacher-class.component';

describe('TeacherClassComponent', () => {
  let component: TeacherClassComponent;
  let fixture: ComponentFixture<TeacherClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherClassComponent]
    });
    fixture = TestBed.createComponent(TeacherClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
