import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCmtComponent } from './add-cmt.component';

describe('AddCmtComponent', () => {
  let component: AddCmtComponent;
  let fixture: ComponentFixture<AddCmtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCmtComponent]
    });
    fixture = TestBed.createComponent(AddCmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
