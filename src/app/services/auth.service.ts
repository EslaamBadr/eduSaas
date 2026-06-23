import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));
  currentUser = signal<string | null>(localStorage.getItem('username'));
  currentRole = signal<string | null>(localStorage.getItem('loginType'));

  login(credentials: { username: string; password: string; loginType?: string }): Observable<any> {
    if (credentials.username.trim().toLowerCase() === 'admin' && credentials.password.trim().toLowerCase() === 'admin') {
      const response = {
        token: 'static_mock_jwt_token_for_admin_session',
        username: credentials.username,
        loginType: credentials.loginType || 'admin'
      };
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      localStorage.setItem('loginType', response.loginType);
      this.isAuthenticated.set(true);
      this.currentUser.set(response.username);
      this.currentRole.set(response.loginType);
      return of(response);
    } else {
      return throwError(() => ({
        status: 401,
        error: { message: 'INVALID_CREDENTIALS' }
      }));
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('loginType');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.currentRole.set(null);
    this.router.navigate(['/login']);
  }
}
