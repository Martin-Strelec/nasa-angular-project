import { TestBed } from '@angular/core/testing';

import { EpicServiceService } from './epic-service.service';

describe('EpicServiceService', () => {
  let service: EpicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
