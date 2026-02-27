import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { guestGuard } from './auth/guards/guest.guard';
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
    canActivate: [guestGuard],
  },
  {
    path: 'shell',
    loadComponent: () =>
      import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
