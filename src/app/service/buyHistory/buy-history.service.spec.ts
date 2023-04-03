import { TestBed } from '@angular/core/testing';

import { BuyHistoryService } from './buy-history.service';

describe('BuyHistoryService', () => {
  let service: BuyHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
