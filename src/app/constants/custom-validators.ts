import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const errors: ValidationErrors = {};

      if (!/[A-Z]/.test(value)) {
        errors['missingUpperCase'] = true; // Use bracket notation
      }
      if (!/[a-z]/.test(value)) {
        errors['missingLowerCase'] = true;
      }
      if (!/[0-9]/.test(value)) {
        errors['missingNumeric'] = true;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors['missingSpecialChar'] = true;
      }
      if (value.length < 12) {
        errors['tooShort'] = true;
      }

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }
// Validator to check if the value contains only letters and spaces
  static onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^[a-zA-Z ]*$/;
      const isValid = pattern.test(control.value);
      return isValid ? null : { onlyLetters: true };
    };
  }


  // confirmValidator
 static ConfirmedValidator(controlName: string, matchingControlName: string): any{
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
