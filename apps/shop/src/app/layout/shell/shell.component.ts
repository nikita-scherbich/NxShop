import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplitterModule, SplitterResizeEndEvent } from 'primeng/splitter';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ShellStateService } from './shell-state.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    SplitterModule,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  host: { '[class.sidebar-open]': 'shellState.isSidebarOpen()' },
})
export class ShellComponent {
  readonly sidebarMinSize = signal(5);
  readonly contentMinSize = signal(80);

  readonly panelSizes = linkedSignal(() => {
    const sidebarMinSize = this.sidebarMinSize();

    return untracked(() => [sidebarMinSize, 100 - sidebarMinSize]);
  });

  readonly shellState = inject(ShellStateService);

  onSidebarResize(event: SplitterResizeEndEvent): void {
    const { sizes } = event;

    if (Number(sizes[0]) > 0) {
      return;
    }

    // this.panelSizes.set([5, 80]);
  }
}
