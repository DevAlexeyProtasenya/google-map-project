import { TestBed } from '@angular/core/testing';

import { TakeStopService } from './take-stop.service';

describe('TakeStopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TakeStopService = TestBed.get(TakeStopService);
    expect(service).toBeTruthy();
  });
});
