import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthUser {
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private authCheck$?: Observable<AuthUser | null>;

  // who is logged in
  private currentUser = signal<AuthUser | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  // call on app start to establish auth state from the cookie
  checkAuth(): Observable<AuthUser | null> {
    // reuse the in-flight/completed check so startup + guard share one call
    if (!this.authCheck$) {
      this.authCheck$ = this.http
        .get<AuthUser>(`${this.base}/auth/me`, { withCredentials: true })
        .pipe(
          tap((user) => this.currentUser.set(user)),
          catchError(() => {
            this.currentUser.set(null);
            return of(null);
          }),
          shareReplay(1),
        );
    }
    return this.authCheck$;
  }

  login(username: string, password: string): Observable<AuthUser> {
    return this.http
      .post<AuthUser>(`${this.base}/auth/login`, { username, password }, { withCredentials: true })
      .pipe(
        tap((user) => {
          this.currentUser.set(user);
          this.authCheck$ = undefined; // force fresh /me next time
        }),
      );
  }

  logout(): Observable<unknown> {
    return this.http.post(`${this.base}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.currentUser.set(null);
        this.authCheck$ = undefined; // clear cached auth state
      }),
    );
  }
}
