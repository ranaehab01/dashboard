import {
  CanMatchFn,
  Router
} from '@angular/router';

import { inject } from '@angular/core';

import { AuthService } from '../../shared/service/auth/auth.service';

export const adminRoleGuard: CanMatchFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const user = authService.getUser();

  if (!token || !user) {

    router.navigate(['/login']);

    return false;
  }

  if (authService.hasRole('admin')) {

    return true;
  }

  router.navigate([
    '/access-denied'
  ]);

  return false;
};