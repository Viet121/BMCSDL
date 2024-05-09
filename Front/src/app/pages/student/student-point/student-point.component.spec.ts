import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPointComponent } from './student-point.component';

describe('StudentPointComponent', () => {
  let component: StudentPointComponent;
  let fixture: ComponentFixture<StudentPointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPointComponent]
    });
    fixture = TestBed.createComponent(StudentPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
