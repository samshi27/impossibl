import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private scroller = inject(ViewportScroller);
  protected auth = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  protected menuOpen = signal(false);

  constructor() {
    this.scroller.setOffset([0, 200]);
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.checkAuth().subscribe();
    }
  }

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  login() {
    this.router.navigate(['/admin/login']);
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/']),
    });
  }
}
