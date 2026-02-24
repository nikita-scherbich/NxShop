import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-shell',
  template: `<router-outlet></router-outlet>`,
  styles: `
    `,
  imports: [CommonModule, RouterModule],
  providers: [],
})
export class AuthShellComponent {}
