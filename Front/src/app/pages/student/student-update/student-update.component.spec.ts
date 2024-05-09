import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdateComponent } from './student-update.component';

describe('StudentUpdateComponent', () => {
  let component: StudentUpdateComponent;
  let fixture: ComponentFixture<StudentUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentUpdateComponent]
    });
    fixture = TestBed.createComponent(StudentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
