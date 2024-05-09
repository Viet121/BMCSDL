import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllowComponent } from './admin-allow.component';

describe('AdminAllowComponent', () => {
  let component: AdminAllowComponent;
  let fixture: ComponentFixture<AdminAllowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAllowComponent]
    });
    fixture = TestBed.createComponent(AdminAllowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
