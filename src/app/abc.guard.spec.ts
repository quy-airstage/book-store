import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { abcGuard } from './abc.guard';

describe('abcGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => abcGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
