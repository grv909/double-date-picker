// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Authentication/auth-service.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            [(ngModel)]="username"
            required
            #usernameInput="ngModel"
          />
          <div
            *ngIf="usernameInput.invalid && usernameInput.touched"
            class="error"
          >
            Username is required
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            [(ngModel)]="password"
            required
            #passwordInput="ngModel"
          />
          <div
            *ngIf="passwordInput.invalid && passwordInput.touched"
            class="error"
          >
            Password is required
          </div>
        </div>

        <button type="submit" [disabled]="!loginForm.valid || loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>

        <div *ngIf="error" class="error">{{ error }}</div>
      </form>

      <p>
        Don't have an account?
        <a>Sign up here</a>
      </p>
    </div>
  `,
  styles: [
    `
      .login-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 8px;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }

      button {
        width: 100%;
        padding: 0.75rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
      }

      button:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
      }

      .error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      a {
        color: #007bff;
        cursor: pointer;
        text-decoration: underline;
      }
    `,
  ],
})
export class LoginPageComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.username || !this.password) {
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      const result = await this.authService.signIn(
        this.username,
        this.password
      );

      if (result.isSignedIn) {
        this.router.navigate(['/date']);
      }
    } catch (error: any) {
      this.error = error.message || 'An error occurred during sign in';
    } finally {
      this.loading = false;
    }
  }
}
