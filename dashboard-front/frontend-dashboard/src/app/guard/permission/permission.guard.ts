import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../shared/service/auth/auth.service";
import { inject } from "@angular/core";

export function permissionGuard(
  requiredPermission: string
): CanActivateFn {

  return () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();
    const user = authService.getUser();

    if (!token || !user) {
      return router.createUrlTree(['/login']);
    }

    if (
      authService.hasPermission(
        requiredPermission
      )
    ) {
      return true;
    }

    return router.createUrlTree([
      '/access-denied'
    ]);
  };
}