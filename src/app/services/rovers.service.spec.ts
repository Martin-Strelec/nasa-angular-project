import { TestBed } from '@angular/core/testing';

import { RoversService } from './rovers.service';

describe('RoversService', () => {
  let service: RoversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
