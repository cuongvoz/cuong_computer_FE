import { TestBed } from '@angular/core/testing';

import { BuyGuard } from './buy.guard';

describe('BuyGuard', () => {
  let guard: BuyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BuyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
