import { TestBed } from '@angular/core/testing';

import { Birthday } from './birthday';

describe('Birthday', () => {
  let service: Birthday;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Birthday);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
