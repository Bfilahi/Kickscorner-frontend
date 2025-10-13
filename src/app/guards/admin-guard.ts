import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);
  
  if(auth.isLoggedIn() && auth.isAdmin())
    return true;

  router.navigate(['/home']);
  return false;
};
