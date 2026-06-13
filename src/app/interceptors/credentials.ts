import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // attach cookies to every request (needed for the jwt cookie on admin routes)
  return next(req.clone({ withCredentials: true }));
};
