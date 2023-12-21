import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidator {

  private static emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private static passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  private static userNameRegex =/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;


  public static checkPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    return this.passwordRegex.test(control.value.password) ? null : {PasswordNotMatch: true}

  };
  public static confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    let pass = control.value.password;
    let confirmPass = control.value.password_repeat;
    return pass === confirmPass ? null : {NotSame: true}

  };

  public static emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    return this.emailRegexp.test(control.value.email) ? null : {EmailNotMatch: true};

  }

  public static firstnameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    return this.userNameRegex.test(control.value.firstname) ? null : {FirstnameNotMatch: true};

  }


  public static lastnameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    return this.userNameRegex.test(control.value.lastname) ? null : {LastnameNotMatch: true};

  }


}
