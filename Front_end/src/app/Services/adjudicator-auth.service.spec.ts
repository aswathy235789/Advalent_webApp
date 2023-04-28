import { TestBed } from '@angular/core/testing';

import { AdjudicatorAuthService } from './adjudicator-auth.service';

describe('AdjudicatorAuthService', () => {
  let service: AdjudicatorAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjudicatorAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
