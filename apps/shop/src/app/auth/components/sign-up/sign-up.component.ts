import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpFormData } from '@app/shared/models';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  // private authService = inject(AuthService);
  private router = inject(Router);

  handleSignUpSubmit(signUpFormData: SignUpFormData) {
    console.log('Sign-up form submitted:', signUpFormData);
    // this.authService.signUp(registrationDetails).subscribe({
    //   next: () => {
    //     // Redirect to login page after successful registration
    //     this.router.navigate(['/login']);
    //   },
    //   error: (err) => {
    //     console.error('Sign-up failed:', err);
    //     // Display error message to the user
    //   },
    // });
  }
}
