import { Routes } from '@angular/router';
import { authRoutes } from './auth/routes/auth.routes';

export const AUTH_BASE_PATH = 'auth-shell';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: AUTH_BASE_PATH,
    pathMatch: 'full',
  },
  {
    path: AUTH_BASE_PATH,
    loadComponent: () =>
      import('./auth/auth-shell.component').then((m) => m.AuthShellComponent),
    children: authRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
