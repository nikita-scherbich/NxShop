import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  // private matSnackBar = inject(MatSnackBar);

  showSuccess(message: string, action = 'Close'): void {
    // this.matSnackBar.open(message, action, {
    //   duration: 3000,
    //   panelClass: ['success-snackbar'],
    // });
  }

  showError(message: string, action = 'Close'): void {
    // this.matSnackBar.open(message, action, {
    //   duration: 5000,
    //   panelClass: ['error-snackbar'],
    // });
  }

  showInfo(message: string, action = 'Close'): void {
    // this.matSnackBar.open(message, action, {
    //   duration: 3000,
    //   panelClass: ['info-snackbar'],
    // });
  }
}
