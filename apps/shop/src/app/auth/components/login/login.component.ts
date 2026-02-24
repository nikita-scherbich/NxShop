import { Component, inject, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { LoginFormData } from '@app/shared/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly #loginFormData = signal<LoginFormData>({
    email: '',
    password: '',
  });

  loginForm = form(this.#loginFormData);

  // private authService = inject(AuthService);
  private router = inject(Router);
  // private googleAuthService = inject(GoogleAuthService); // Inject GoogleAuthService

  handleLoginSubmit(loginForm: LoginFormData) {
    console.log('Login form submitted:', loginForm);
    // this.authService.login(loginForm).subscribe({
    //   next: () => {
    //     // Redirect to a protected page or dashboard after successful login
    //     this.router.navigate(['/']); // Example: navigate to home page
    //   },
    //   error: (err) => {
    //     console.error('Login failed:', err);
    //     // Display error message to the user
    //   },
    // });
  }

  signInWithGoogle() {
    // this.googleAuthService.signInWithGoogle();
  }
}
