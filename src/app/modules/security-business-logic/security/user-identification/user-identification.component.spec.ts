import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentificationComponent } from './user-identification.component';

describe('UserIdentificationComponent', () => {
  let component: UserIdentificationComponent;
  let fixture: ComponentFixture<UserIdentificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdentificationComponent]
    });
    fixture = TestBed.createComponent(UserIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
