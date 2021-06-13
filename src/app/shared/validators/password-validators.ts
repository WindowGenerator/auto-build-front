import {AbstractControl, ValidationErrors} from '@angular/forms';

export function passwordControlValidator(control: AbstractControl): ValidationErrors | null {
  const password_check = control.get('password_check') || null;
  if (password_check === null) {
    return null;
  }
  const password = control.get('password');

  if (password.value !== password_check.value) {
    return {passwordMismatch: true};
  }
  return null;
}
