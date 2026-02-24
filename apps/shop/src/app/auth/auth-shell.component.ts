import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TriangleBackgroundComponent } from '@app/shared/components';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-auth-shell',
  template: `
    <main>
      <app-triangle-background [config]="triangleBackgroundConfig()" />
      <app-login />
      <section>
        <button type="button">Sign In With Google</button>
        <a>Sign Up</a>
      </section>
    </main>
    <
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;

      main {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
    }
  `,
  imports: [CommonModule, LoginComponent, TriangleBackgroundComponent],
  providers: [],
})
export class AuthShellComponent {
  triangleBackgroundConfig = signal({
    densityCoefficient: 1,
  });
}
