import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  submitted!: boolean;

  emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private router:Router, private formBuilder: FormBuilder){
    this.signupForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegexp), Validators.min(1)]],
      psw: [null, Validators.required],
      psw_repeat: [null, Validators.required],
    },
    {
      updateOn:"submit"
    })

    this.submitted = false;
  }

  onCancel():void{
    this.router.navigateByUrl('/home');
  }

  onSignup() {
    console.log("invalide forme: " + this.signupForm.invalid)
   if(this.signupForm.invalid){
    this.submitted = true;
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
   }
  }

}
