import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerFailureComponent } from './server-failure.component';

describe('ServerFailureComponent', () => {
  let component: ServerFailureComponent;
  let fixture: ComponentFixture<ServerFailureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerFailureComponent]
    });
    fixture = TestBed.createComponent(ServerFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
