import { TestBed } from '@angular/core/testing';

import { ClickedOutsideService } from './clicked-outside.service';

describe('ClickedOutsideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClickedOutsideService = TestBed.get(ClickedOutsideService);
    expect(service).toBeTruthy();
  });
});
