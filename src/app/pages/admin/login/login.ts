import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal<string | null>(null);
  submitting = signal(false);

  login() {
    if (!this.username().trim() || !this.password()) {
      this.error.set('Enter username and password.');
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    this.auth.login(this.username(), this.password()).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (err) => {
        this.submitting.set(false);
        this.error.set(err?.error?.detail ?? 'Login failed. Check your credentials.');
      },
    });
  }
}
