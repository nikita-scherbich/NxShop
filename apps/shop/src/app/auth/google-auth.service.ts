import { Injectable } from '@angular/core';
// import { NotificationsService } from '@nxshop/shared/notifications';

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  // private notificationsService = inject(NotificationsService);

  signInWithGoogle(): void {
    // Simulate a successful Google login after a short delay
    setTimeout(() => {
      const success = Math.random() > 0.3; // Simulate 70% success rate
      if (success) {
        // this.notificationsService.showSuccess('Google Login successful (mock)!');
        console.log('Mock Google Login successful!');
        // In a real scenario, you would redirect or update auth state here
      } else {
        // this.notificationsService.showError('Google Login failed (mock). Please try again.');
        console.error('Mock Google Login failed.');
      }
    }, 1000);
  }
}
