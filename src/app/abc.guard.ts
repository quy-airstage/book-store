import { CanActivateFn } from '@angular/router';

export const abcGuard: CanActivateFn = (route, state) => {
  return true;
};
