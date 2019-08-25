import { TestBed } from '@angular/core/testing';

import { DebtService } from './debt.service';

describe('DebtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebtService = TestBed.get(DebtService);
    expect(service).toBeTruthy();
  });
});
