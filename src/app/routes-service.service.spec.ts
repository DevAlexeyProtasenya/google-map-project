import { TestBed } from '@angular/core/testing';

import { RoutesServiceService } from './routes-service.service';

describe('RoutesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutesServiceService = TestBed.get(RoutesServiceService);
    expect(service).toBeTruthy();
  });
});
