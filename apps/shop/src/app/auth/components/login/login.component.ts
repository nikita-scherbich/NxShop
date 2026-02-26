import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  form,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { LoginFormData } from '@nxshop/shared';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AuthService } from '../../auth.service';
import { GoogleAuthService } from '../../google-auth.service';

const primengModules = [
  ButtonModule,
  InputTextModule,
  AutoFocusModule,
  FloatLabelModule,
  IconFieldModule,
  InputIconModule,
  CheckboxModule,
  MessageModule,
  DividerModule,
  ToggleButtonModule,
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormField, ...primengModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly loginLoading = signal(false);
  readonly hidePassword = signal(true); // Signal for password visibility

  private authService = inject(AuthService); // Inject AuthService
  // private notificationsService = inject(NotificationsService); // Inject NotificationsService
  private router = inject(Router);
  private googleAuthService = inject(GoogleAuthService); // Inject GoogleAuthService

  constructor() {
    effect(() => {
      const loginFormData = this.loginFormModel();
      console.log('Login form data changed:', loginFormData);
    });
  }

  private loginFormModel = signal<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  loginForm = form(this.loginFormModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    pattern(
      schemaPath.email,
      new RegExp(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/),
      { message: 'Please enter a valid email address' },
    );
    maxLength(schemaPath.email, 255, {
      message: 'Email cannot exceed 255 characters',
    });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, {
      message: 'Password must be at least 8 characters long',
    });
    pattern(
      schemaPath.password,
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
      { message: 'Password is not valid' },
    );
  });

  login() {
    const loginForm = this.loginForm();

    if (loginForm.invalid()) {
      console.log('Login form is invalid');
      this.loginForm().markAsTouched();
      // this.notificationsService.showError('Please correct the form errors.');
      return;
    }

    this.authService
      .login(loginForm.value())
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.router.navigate(['/auth-shell']);
        // this.notificationsService.showSuccess('Login successful!');
      });
  }

  signInWithGoogle(): void {
    this.googleAuthService.signInWithGoogle();
  }

  togglePasswordVisibility(): void {
    this.hidePassword.set(!this.hidePassword());
  }

  navigateToSignUp(): void {
    this.router.navigateByUrl('/auth-shell/sign-up');
  }
}
