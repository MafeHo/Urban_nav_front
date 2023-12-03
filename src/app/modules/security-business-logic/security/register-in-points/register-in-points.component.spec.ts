import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInPointsComponent } from './register-in-points.component';

describe('RegisterInPointsComponent', () => {
  let component: RegisterInPointsComponent;
  let fixture: ComponentFixture<RegisterInPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterInPointsComponent]
    });
    fixture = TestBed.createComponent(RegisterInPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
