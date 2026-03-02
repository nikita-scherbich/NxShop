import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthService } from '../../auth/auth.service';
import { ShellStateService } from '../shell/shell-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    AvatarModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private shellStateService = inject(ShellStateService);
  private authService = inject(AuthService);

  readonly notificationsCount = signal(String(2));

  toggleSidebar() {
    this.shellStateService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
  }
}
