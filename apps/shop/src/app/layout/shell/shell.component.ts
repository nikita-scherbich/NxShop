import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ShellStateService } from './shell-state.service'; // Import ShellStateService

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  host: { '[class.sidebar-open]': 'shellState.isSidebarOpen()' }, // Add host binding
})
export class ShellComponent {
  public readonly shellState = inject(ShellStateService);
}
