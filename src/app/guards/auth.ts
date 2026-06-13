import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // during SSR there's no cookie access - don't decide auth on the server.
  // allow render; the client will re-run the guard with the real cookie.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (auth.isLoggedIn()) {
    return true;
  }

  return auth
    .checkAuth()
    .pipe(map((user) => (user ? true : router.createUrlTree(['/admin/login']))));
};
