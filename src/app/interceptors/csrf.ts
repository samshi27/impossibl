import { HttpInterceptorFn } from '@angular/common/http';

const MUTATING_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

function readCookie(name: string): string | null {
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  // only mutating requests need the CSRF token
  if (!MUTATING_METHODS.includes(req.method)) {
    return next(req);
  }

  const token = readCookie('XSRF-TOKEN');
  if (!token) {
    return next(req); // no token to send; let the backend reject if needed
  }

  return next(req.clone({ setHeaders: { 'X-XSRF-TOKEN': token } }));
};
