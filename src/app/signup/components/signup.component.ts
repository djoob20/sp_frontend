import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  submitted!: boolean;

  emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  invalidControlName!: string;
  invalidEmail!: boolean;
  otherFieldInvalid!: boolean;
  invalidPassword!: boolean;

  constructor(private router:Router, private formBuilder: FormBuilder){
    this.signupForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegexp), Validators.min(1)]],
      psw: [null, [Validators.required, Validators.minLength(12)]],
      psw_repeat: [null, [Validators.required, Validators.minLength(12)]],
    },
      { validators: [this.confirmPasswordValidator] }
    )

    this.submitted = false;
  }

  onCancel():void{
    this.router.navigateByUrl('/home');
  }

  onSignup() {
    console.log("invalide form: " + this.signupForm.invalid)
   if(this.signupForm.invalid){
    this.submitted = true;
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
     console.log("Invalid controls: " + this.findInvalidControls())
   }
  }

  public findInvalidControls() {
    const controls = this.signupForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        switch (name) {
          case "firstname":
            this.invalidControlName = "prénom";
            this.invalidEmail = false;
            this.invalidPassword = false;
            this.otherFieldInvalid = true;
            break;
          case "lastname":
            this.invalidControlName = "nom";
            this.invalidEmail = false;
            this.invalidPassword = false;
            this.otherFieldInvalid = true;
            break;
          case "email":
            this.otherFieldInvalid = false;
            this.invalidPassword = false;
            this.invalidEmail = true;
            break;
          case "psw":
            this.invalidEmail = false;
            this.otherFieldInvalid = false;
            this.invalidPassword = true;
            break;
          case "psw_repeat":
            this.invalidEmail = false;
            this.otherFieldInvalid = false;
            this.invalidPassword = true;
            break;
          default:
            break;
        }


        return name
      }
    }
    return null;
  }

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if(control.value.psw === control.value.psw_repeat){
      this.invalidPassword = false;
      return null;
    }else{
      this.invalidPassword = true;
      return { PasswordNoMatch: true };
    }

  };

}
