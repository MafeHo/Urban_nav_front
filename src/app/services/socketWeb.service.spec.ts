import { TestBed } from '@angular/core/testing';

import { SocketWebService } from './socketWeb.service';

describe('SocketWebService', () => {
  let service: SocketWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
