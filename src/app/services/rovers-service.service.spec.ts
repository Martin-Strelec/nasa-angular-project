import { TestBed } from '@angular/core/testing';

import { RoversServiceService } from './rovers-service.service';

describe('RoversServiceService', () => {
  let service: RoversServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoversServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
