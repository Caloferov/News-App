import { TestBed } from '@angular/core/testing';
import { FetchRSSNewsService } from './fetch-RSS-news.service';


describe('FetchNewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchRSSNewsService = TestBed.get(FetchRSSNewsService);
    expect(service).toBeTruthy();
  });
});
