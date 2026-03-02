import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormData, LoginResponse, SignUpFormData } from '@nxshop/shared';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  signUp(registrationDetails: SignUpFormData): Observable<void> {
    return this.http.post<void>('/api/signup', registrationDetails);
  }

  login(credentials: LoginFormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', credentials).pipe(
      tap((response) => {
        // Store JWT token in a secure cookie
        // For 'rememberMe', the cookie expiration can be set longer.
        // For mock, we'll set a default expiration.
        const expirationDate = credentials.rememberMe
          ? response.expireAt
          : undefined;

        this.cookieService.set(
          'jwt_token',
          response.accessToken,
          expirationDate,
          '/',
          undefined,
          true,
          'Lax',
        );

        // For now, no user object is stored in authStore.
        // this.authStore.setUser(this.extractUserFromToken(response.token));
      }),
      catchError((error) => {
        throw new Error(error.error?.message || 'Login failed');
      }),
    );
  }

  // Placeholder for Google Login
  // googleLogin(idToken: string): Observable<any> {
  //   return this.http.post<any>(`${this.AUTH_API_URL}/google-login`, { idToken });
  // }

  logout(): void {
    this.cookieService.delete('jwt_token', '/', 'localhost');
    this.router.navigate(['/auth-shell/login']);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('jwt_token');

    return Boolean(token);
  }
}
