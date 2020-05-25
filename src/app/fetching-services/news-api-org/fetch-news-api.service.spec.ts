import { TestBed } from '@angular/core/testing';

import { FetchNewsAPIService } from './fetch-news-api.service';

describe('FetchNewsAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchNewsAPIService = TestBed.get(FetchNewsAPIService);
    expect(service).toBeTruthy();
  });
});
