import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginFormData, SignUpFormData } from '@nxshop/shared';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  // private authStore = inject(AuthStore); // Will be implemented in a later phase

  private readonly AUTH_API_URL = '/api/auth';

  signUp(registrationDetails: SignUpFormData): Observable<void> {
    return this.http.post<void>(
      `${this.AUTH_API_URL}/signup`,
      registrationDetails,
    );
  }

  login(credentials: LoginFormData): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.AUTH_API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          // Store JWT token in a secure cookie
          // For 'rememberMe', the cookie expiration can be set longer.
          // For mock, we'll set a default expiration.
          const expirationDate = credentials.rememberMe
            ? new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
            : undefined;

          this.cookieService.set(
            'jwt_token',
            response.token,
            expirationDate,
            '/',
            undefined,
            true,
            'Lax',
          ); // Secure, HttpOnly (backend sets), Lax for CSRF protection
          console.log('JWT token stored in cookie:', response.token);

          // For now, no user object is stored in authStore.
          // this.authStore.setAccessToken(response.token);
          // this.authStore.setUser(this.extractUserFromToken(response.token));
        }),
        catchError((error) => {
          throw new Error(error.error?.message || 'Login failed');
        }),
      );
  }

  // Placeholder for logout method
  // logout(): void {
  //   this.authStore.clearAuth();
  // }

  // Placeholder for Google Login
  // googleLogin(idToken: string): Observable<any> {
  //   return this.http.post<any>(`${this.AUTH_API_URL}/google-login`, { idToken });
  // }
}
