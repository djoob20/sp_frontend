import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../../../env/environments";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {CredentialResponse} from "google-one-tap";
import {CustomValidator} from "../../../core/validators/custom-validator";
import {HelperService} from "../../../core/services/helper.services";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  private googleClientId: string = environment.Google.clientID;

  signupForm!: FormGroup;
  submitted!: boolean;

  invalidEmail!: boolean;
  invalidPassword!: boolean;

  @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});

  private signinLink = document.getElementById('signin-link');

  constructor(private router: Router,
              private _ngZone: NgZone,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private helperService: HelperService,
              private responsive: BreakpointObserver) {

    this.signupForm = this.formBuilder.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, [Validators.required, Validators.min(1)]],
        password: [null, Validators.required],
        password_repeat: [''],
      },
      {
        validators:
          [
            CustomValidator.checkPasswordValidator,
            CustomValidator.confirmPasswordValidator,
            CustomValidator.emailValidator

          ],
        updateOn: 'change'
      }
    )

    this.submitted = false;

    this.handleInvalidControls();


  }

  ngOnDestroy(): void {
    this.helperService.setSecondaryFooterStyle(false);
  }


  ngOnInit(): void {
    this.helperService.setSecondaryFooterStyle(true);
    window.onload = () => {
      // @ts-ignore
      this.initGoogleButton();

      // @ts-ignore
      google.accounts.id.prompt(); // also display the One Tap dialog

    }


    this.responsive
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('state: '+ state.matches)
          this.showOrHideSignupForm('hide');


          if(this.signinLink){
            this.signinLink.classList.add('show');
          }
        }else{
          this.showOrHideSignupForm('show')
          if(this.signinLink){
            this.signinLink.classList.add('hide');
          }
        }
      });


    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // @ts-ignore
    signUpButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.add("right-panel-active");
    });

    // @ts-ignore
    signInButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.remove("right-panel-active");
      this.submitted = false;

    });

  }

  async handleCredentialResponse(response: CredentialResponse) {
    this.authService.loginWithGoogle(response.credential).subscribe(
      (x: any) => {
        localStorage.setItem('token', x.token);
        this.authService.setToken(x.token);
        this._ngZone.run(() => {
          this.router.navigateByUrl('/home');
        })
      },
      (error: any) => {
        console.log(error)
      }
    )
  }


  onSignup() {

  }

  onCancel() {

  }

  onLogin() {
  }

  ngAfterViewInit(): void {
    // this.initGoogleButton();

    /* const GB = document.getElementById('google-btn');
     if (GB){
       GB.classList.add('btn-google');
     }*/

  }


  initGoogleButton(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
      ux_mode: "popup"
    });

    // @ts-ignore
    google.accounts.id.renderButton(
      this.googleButton.nativeElement,
      {theme: "outline", size: "large", width: 340}
    )

  }

  login() {

  }

  onSubmit() {

    this.submitted = true;
    this.invalidEmail = false;
    this.invalidPassword = false;

    if (this.signupForm.invalid) {
      this.handleInvalidControls();
    } else {

    }


  }

  public handleInvalidControls() {
    const controls = this.signupForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        switch (name) {
          case "firstname":
            break;
          case "lastname":
            break;
          case "email":
            this.invalidEmail = true;
            break;
          case "password":
            this.invalidPassword = true;
            break;
          case "password_repeat":
            this.invalidPassword = true;
            break;
          default:
            this.invalidPassword = false;
            this.invalidEmail = false;
            break;
        }

      }
    }

  }


  showOrHideSignupForm(value: 'show' | 'hide') {
    const signup = document.getElementById('sign-up-container');

    if(signup){
       signup.classList.add(value);
    }

  }

  onShowSignupForm() {
    const signup = document.getElementById('sign-up-container');
    const signin = document.getElementById('sign-in-container');
    const container = document.getElementById('container');

    if(signup){
      // @ts-ignore
      container.classList.add("right-panel-active");
      // @ts-ignore
      container.classList.remove("left-panel-active");
      signup.classList.remove('hide');
      signup.classList.add('show');

    }

    if (signin){
      signin.classList.add('hide');
      signin.classList.remove('show')
    }
  }

  onShowSigninForm() {
    const signup = document.getElementById('sign-up-container');
    const signin = document.getElementById('sign-in-container');
    const container = document.getElementById('container');

    if (container){
      container.classList.remove("right-panel-active");
      container.classList.add("left-panel-active");
    }

    if (signup){
      signup.classList.add('hide');
      signup.classList.remove('show');
    }


    if (signin){
      signin.classList.remove('hide');
      signin.classList.add('show')
    }

  }



}
