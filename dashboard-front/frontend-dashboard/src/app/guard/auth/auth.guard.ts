import {
  CanActivateFn,
  Router
} from '@angular/router';

import { inject } from '@angular/core';

import { AuthService } from '../../shared/service/auth/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const user = authService.getUser();

  if (!token || !user) {

    return router.createUrlTree([
      '/login'
    ]);
  }

  return true;
};