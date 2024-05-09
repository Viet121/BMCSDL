import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCmtComponent } from './read-cmt.component';

describe('ReadCmtComponent', () => {
  let component: ReadCmtComponent;
  let fixture: ComponentFixture<ReadCmtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadCmtComponent]
    });
    fixture = TestBed.createComponent(ReadCmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
