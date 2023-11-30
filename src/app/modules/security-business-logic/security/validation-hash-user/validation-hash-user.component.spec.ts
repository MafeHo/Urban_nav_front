import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationHashUserComponent } from './validation-hash-user.component';

describe('ValidationHashUserComponent', () => {
  let component: ValidationHashUserComponent;
  let fixture: ComponentFixture<ValidationHashUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationHashUserComponent]
    });
    fixture = TestBed.createComponent(ValidationHashUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
