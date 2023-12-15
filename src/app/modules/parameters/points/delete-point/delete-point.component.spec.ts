import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePointComponent } from './delete-point.component';

describe('DeletePointComponent', () => {
  let component: DeletePointComponent;
  let fixture: ComponentFixture<DeletePointComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePointComponent]
    });
    fixture = TestBed.createComponent(DeletePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
