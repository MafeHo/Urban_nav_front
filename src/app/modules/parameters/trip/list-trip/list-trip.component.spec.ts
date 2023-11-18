import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTripComponent } from './list-trip.component';

describe('ListTripComponent', () => {
  let component: ListTripComponent;
  let fixture: ComponentFixture<ListTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTripComponent]
    });
    fixture = TestBed.createComponent(ListTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
