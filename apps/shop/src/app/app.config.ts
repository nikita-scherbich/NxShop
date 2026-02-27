import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { authTokenInterseptor } from './auth/interseptors/auth-token.interseptor';
import { baseUrlInterseptor } from './auth/interseptors/base-url.interseptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        baseUrlInterseptor,
        authTokenInterseptor,
      ]),
    ),
    providePrimeNG({
      theme: { preset: Aura },
    }),
  ],
};
