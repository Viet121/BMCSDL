import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClassComponent } from './read-class.component';

describe('ReadClassComponent', () => {
  let component: ReadClassComponent;
  let fixture: ComponentFixture<ReadClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadClassComponent]
    });
    fixture = TestBed.createComponent(ReadClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
