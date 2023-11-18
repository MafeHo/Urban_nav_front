import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNotfoundComponent } from './route-notfound.component';

describe('RouteNotfoundComponent', () => {
  let component: RouteNotfoundComponent;
  let fixture: ComponentFixture<RouteNotfoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteNotfoundComponent]
    });
    fixture = TestBed.createComponent(RouteNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
