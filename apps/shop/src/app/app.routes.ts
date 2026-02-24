import { Routes } from '@angular/router';

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
  },
  {
    path: '**',
    redirectTo: '',
  },
];
