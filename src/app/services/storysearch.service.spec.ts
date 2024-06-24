import { TestBed } from '@angular/core/testing';

import { StorysearchService } from './storysearch.service';

describe('StorysearchService', () => {
  let service: StorysearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorysearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
