import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariablesComponent } from './edit-variables.component';

describe('EditVariablesComponent', () => {
  let component: EditVariablesComponent;
  let fixture: ComponentFixture<EditVariablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVariablesComponent]
    });
    fixture = TestBed.createComponent(EditVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
