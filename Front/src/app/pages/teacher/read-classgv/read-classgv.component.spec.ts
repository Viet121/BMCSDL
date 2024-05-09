import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadClassgvComponent } from './read-classgv.component';

describe('ReadClassgvComponent', () => {
  let component: ReadClassgvComponent;
  let fixture: ComponentFixture<ReadClassgvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadClassgvComponent]
    });
    fixture = TestBed.createComponent(ReadClassgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
