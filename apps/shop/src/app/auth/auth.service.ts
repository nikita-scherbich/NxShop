// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

// interface LoginResponse {
//   accessToken: string;
//   refreshToken: string;
//   user: User;
// }

// interface DecodedToken {
//   sub: string; // Subject (user ID)
//   roles: string[]; // User roles
//   // other claims
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private http = inject(HttpClient);
//   private authStore = inject(AuthStore);

//   // Placeholder for backend API URL
//   private readonly AUTH_API_URL = '/api/auth';

//   private extractUserFromToken(token: string): User {
//     try {
//       const decoded: DecodedToken = jwtDecode(token);
//       // Assuming 'sub' is the user ID and 'roles' is an array of strings
//       return {
//         id: decoded.sub,
//         email: decoded.sub, // Assuming email is in sub, or another claim
//         roles: decoded.roles || [],
//       };
//     } catch (e) {
//       console.error('Failed to decode JWT or extract user info:', e);
//       return null as any; // Return null or throw error
//     }
//   }

//   login(credentials: { email: string; password: string }): Observable<LoginResponse> {
//     this.authStore.setLoading(true);
//     return this.http.post<LoginResponse>(`${this.AUTH_API_URL}/login`, credentials).pipe(
//       tap(response => {
//         const user = this.extractUserFromToken(response.accessToken);
//         this.authStore.setAccessToken(response.accessToken);
//         // The refresh token is assumed to be handled securely by the backend (e.g., via HttpOnly cookie).
//         // The frontend only manages the access token in the AuthStore.
//         this.authStore.setUser(user);
//         this.authStore.setLoading(false);
//       })
//     );
//   }

//   signUp(registrationDetails: RegistrationDetails): Observable<LoginResponse> {
//     this.authStore.setLoading(true);
//     return this.http.post<LoginResponse>(`${this.AUTH_API_URL}/signup`, registrationDetails).pipe(
//       tap(response => {
//         const user = this.extractUserFromToken(response.accessToken);
//         this.authStore.setAccessToken(response.accessToken);
//         this.authStore.setUser(user);
//         this.authStore.setLoading(false);
//       })
//     );
//   }

//   logout(): void {
//     // Invalidate refresh token on backend if applicable
//     // this.http.post(`${this.AUTH_API_URL}/logout`, {}).subscribe();
//     this.authStore.clearAuth();
//   }

//   // Placeholder for Google Login
//   googleLogin(idToken: string): Observable<LoginResponse> {
//     this.authStore.setLoading(true);
//     return this.http.post<LoginResponse>(`${this.AUTH_API_URL}/google-login`, { idToken }).pipe(
//       tap(response => {
//         const user = this.extractUserFromToken(response.accessToken);
//         this.authStore.setAccessToken(response.accessToken);
//         this.authStore.setUser(user);
//         this.authStore.setLoading(false);
//       })
//     );
//   }
// }
