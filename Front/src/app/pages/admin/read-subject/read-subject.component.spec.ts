import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSubjectComponent } from './read-subject.component';

describe('ReadSubjectComponent', () => {
  let component: ReadSubjectComponent;
  let fixture: ComponentFixture<ReadSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadSubjectComponent]
    });
    fixture = TestBed.createComponent(ReadSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
