import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth/auth.service';
import { inject } from '@angular/core';

export const adminRoleGuard: CanMatchFn = (route, segments) => {
  
const authService = inject(AuthService); //mfesh constructor 3shan dee function
const router = inject(Router);

const user = authService.getUser();


if (!user) {
router.navigate(['/login']);
return false;
}


if (user.type === 'admin' || user.type === 'product_manager') {
return true;
}


router.navigate(['/access-denied']);
return false;
};
