import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeacherComponent } from './create-teacher.component';

describe('CreateTeacherComponent', () => {
  let component: CreateTeacherComponent;
  let fixture: ComponentFixture<CreateTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeacherComponent]
    });
    fixture = TestBed.createComponent(CreateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
