import { AbstractControl, ValidationErrors } from '@angular/forms';

export class EmailValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!control.value) {
      return { required: true }; // Email is required
    }

    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true }; // Email format is incorrect
    }

    return null; // Valid email
  }
}
