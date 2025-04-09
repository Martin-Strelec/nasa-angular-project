import { TestBed } from '@angular/core/testing';

import { SimpleCacheService } from './simple-cache.service';

describe('SimpleCacheService', () => {
  let service: SimpleCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
