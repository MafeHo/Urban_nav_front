import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwofaIdentificationComponent } from './twofa-identification.component';

describe('TwofaIdentificationComponent', () => {
  let component: TwofaIdentificationComponent;
  let fixture: ComponentFixture<TwofaIdentificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwofaIdentificationComponent]
    });
    fixture = TestBed.createComponent(TwofaIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
