import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ShellStateService } from '../shell/shell-state.service'; // Adjusted path

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private shellStateService = inject(ShellStateService);
  private authService = inject(AuthService); // Inject AuthService
  private router = inject(Router);

  toggleSidebar() {
    this.shellStateService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
