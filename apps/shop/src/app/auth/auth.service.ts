import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginFormData, LoginResponse, SignUpFormData } from '@nxshop/shared';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

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

  isAuthenticated(): boolean {
    const token = this.cookieService.get('jwt_token');

    return Boolean(token);
  }
}
