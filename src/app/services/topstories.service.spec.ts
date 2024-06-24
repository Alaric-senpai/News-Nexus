import { TestBed } from '@angular/core/testing';

import { TopstoriesService } from './topstories.service';

describe('TopstoriesService', () => {
  let service: TopstoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopstoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
