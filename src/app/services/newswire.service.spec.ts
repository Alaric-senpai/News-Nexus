import { TestBed } from '@angular/core/testing';

import { NewswireService } from './newswire.service';

describe('NewswireService', () => {
  let service: NewswireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewswireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
