import { TestBed } from '@angular/core/testing';

import { FetchstoryService } from './fetchstory.service';

describe('FetchstoryService', () => {
  let service: FetchstoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchstoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
