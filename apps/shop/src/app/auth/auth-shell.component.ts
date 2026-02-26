import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TriangleBackgroundComponent,
  TriangleBackgroundConfig,
} from '@nxshop/shared';
import { FocusTrapModule } from 'primeng/focustrap';

@Component({
  selector: 'app-auth-shell',
  template: `
    <main pFocusTrap>
      <app-triangle-background
        class="background"
        [config]="triangleBackgroundConfig()"
      />
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      main {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;

        .background {
          z-index: -1;
        }
      }
    }
  `,
  imports: [
    CommonModule,
    RouterOutlet,
    TriangleBackgroundComponent,
    FocusTrapModule,
  ],
  providers: [],
})
export class AuthShellComponent {
  triangleBackgroundConfig = signal<Partial<TriangleBackgroundConfig>>({
    densityCoefficient: 1.2,
    attractionStrength: 1.5,
  });
}
