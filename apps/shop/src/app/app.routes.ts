import { Routes } from '@angular/router';
import { authRoutes } from './auth/routes/auth.routes';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth-shell',
    pathMatch: 'full',
  },
  {
    path: 'auth-shell',
    loadComponent: () =>
      import('./auth/auth-shell.component').then((m) => m.AuthShellComponent),
    children: authRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
