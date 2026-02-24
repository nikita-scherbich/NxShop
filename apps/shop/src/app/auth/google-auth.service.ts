import { Injectable, inject } from '@angular/core';
// import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
// import { from, Observable, switchMap, tap } from 'rxjs';
// import { AuthStore } from '../state/auth.store'; // Import AuthStore
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  // private socialAuthService = inject(SocialAuthService);
  // private authService = inject(AuthService);
  // private authStore = inject(AuthStore);

  // Placeholder for Google Client ID (configured in app.config.ts via SocialAuthServiceConfig)
  // private readonly GOOGLE_CLIENT_ID: string;

  // constructor() {
  //   // Listen for Google auth state changes
  //   this.socialAuthService.authState.pipe(
  //     switchMap((socialUser: SocialUser) => {
  //       if (socialUser && socialUser.idToken) {
  //         console.log('Google ID Token:', socialUser.idToken);
  //         // Call AuthService to exchange ID token for app-specific JWT
  //         return this.authService.googleLogin(socialUser.idToken); // Assuming googleLogin method in AuthService
  //       }
  //       return from([null]); // No social user or no idToken, return an observable of null
  //     }),
  //     tap(appAuthResponse => {
  //       if (appAuthResponse) {
  //         this.authStore.setAccessToken(appAuthResponse.accessToken);
  //         this.authStore.setUser(appAuthResponse.user);
  //         this.authStore.setLoading(false);
  //       }
  //     })
  //   ).subscribe();
  // }

  // // Method to trigger Google Login
  // signInWithGoogle(): Promise<SocialUser> {
  //   this.authStore.setLoading(true);
  //   return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signOut(): Promise<void> {
  //   this.authStore.setLoading(true);
  //   return this.socialAuthService.signOut().then(() => {
  //     this.authStore.clearAuth();
  //     this.authStore.setLoading(false);
  //   });
  // }
}
