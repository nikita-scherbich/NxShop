import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  form,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { SignUpFormData } from '@nxshop/shared';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AUTH_BASE_PATH } from '../../../app.routes';
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
];

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormField, ...primengModules],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  readonly signUpLoading = signal(false);

  private readonly authService = inject(AuthService);
  // private readonly notificationsService = inject(NotificationsService);
  private readonly router = inject(Router);
  private readonly googleAuthService = inject(GoogleAuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly passwordVisible = signal(false);
  readonly confirmPasswordVisible = signal(false);

  private readonly signUpFormModel = signal<SignUpFormData>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  readonly signUpForm = form(this.signUpFormModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    required(schemaPath.surname, { message: 'Surname is required' });
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
    required(schemaPath.confirmPassword, {
      message: 'Confirm Password is required',
    });
    // pattern(
    //   schemaPath.confirmPassword,
    //   new RegExp(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   ),
    //   { message: 'Password is not valid' },
    // );
    validate(schemaPath.confirmPassword, ({ value, valueOf }) => {
      const confirmPassword = value();
      const password = valueOf(schemaPath.password);
      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });
  });

  signUp() {
    if (this.signUpForm().invalid()) {
      this.signUpForm().markAsTouched();
      // this.notificationsService.showError('Please correct the form errors.');
      return;
    }

    this.authService
      .signUp(this.signUpForm().value())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // this.notificationsService.showSuccess(
        //   'Account created successfully! Please log in.',
        // );
        this.router.navigate([`/${AUTH_BASE_PATH}/login`]);
      });
  }

  signInWithGoogle() {
    this.googleAuthService.signInWithGoogle();
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/auth-shell/login');
  }
}
