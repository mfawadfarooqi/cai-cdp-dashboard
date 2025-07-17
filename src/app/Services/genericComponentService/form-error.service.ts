import { Injectable } from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  // for Names
  getLastNameErrorMessage(control: AbstractControl, labelContent: any): string {
    if (control.errors?.['required']) {
      return labelContent.lastNameIsRequired;
    }
    if (control.errors?.['onlyLetters']) {
      return labelContent.validLastName;
    }
    return '';

  }
  getFirstNameErrorMessage(control: AbstractControl, labelContent: any): string {
    if (control.errors?.['required']) {
      return labelContent.firstNameIsRequired;
    }
    if (control.errors?.['onlyLetters']) {
      return labelContent.validFirstName;
    }
    return '';
  }

    // for Email
  getEmailErrorMessage(control: AbstractControl, labelContent: any): string {
    if (control.errors?.['required']) {
      return labelContent.emailIsRequired;
    }
    if (control.errors?.['email']) {
      return labelContent.validEmail;
    }
    return '';
  }
  getPhoneNumberError(control: AbstractControl, labelContent: any){
    if (control.errors?.['required']) {
      return labelContent.phoneNumberIsRequired;
    }
  }
// for Password
  getPasswordErrorMessage(control: AbstractControl, labelContent: any): string {
    if (control.errors?.['required']) {
      return labelContent.passwordRequired;
    }
    if (control.errors?.['missingUpperCase']) {
      return labelContent.missingUpperCase;
    }
    if (control.errors?.['missingLowerCase']) {
      return labelContent.missingLowerCase;
    }
    if (control.errors?.['missingNumeric']) {
      return labelContent.missingNumeric;
    }
    if (control.errors?.['missingSpecialChar']) {
      return labelContent.missingSpecialChar;
    }
    if (control.errors?.['tooShort']) {
      return labelContent.tooShort;
    }
    return '';
  }
  getPasswordMessageValidMessage(control: AbstractControl, labelContent: any): string {
    if (control.errors) {

      return labelContent.notMatch;
    }
    return '';
  }

  trimInputField(control: FormControl): void {
    const trimmedValue = control?.value?.trim();
    control.patchValue(trimmedValue);
  }
}
