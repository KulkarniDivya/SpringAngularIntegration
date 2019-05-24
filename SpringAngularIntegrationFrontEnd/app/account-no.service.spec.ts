import { TestBed } from '@angular/core/testing';

import { AccountNoService } from './account-no.service';

describe('AccountNoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountNoService = TestBed.get(AccountNoService);
    expect(service).toBeTruthy();
  });
});
