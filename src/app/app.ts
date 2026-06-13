import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
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

  constructor() {
    this.scroller.setOffset([0, 200]);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.checkAuth().subscribe();
    }
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/']),
    });
  }
}
