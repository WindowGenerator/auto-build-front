import {AbstractControl, ValidationErrors} from '@angular/forms';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;


export function emailValidator(control: AbstractControl): ValidationErrors | null {
  if (!!control.value && !EMAIL_REGEXP.test(control.value)) {
    return { 'WrongEmailFormat': true };
  }
  return null;
}
