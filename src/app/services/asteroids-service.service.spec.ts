import { TestBed } from '@angular/core/testing';

import { AsteroidsServiceService } from './asteroids-service.service';

describe('AsteroidsServiceService', () => {
  let service: AsteroidsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsteroidsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
