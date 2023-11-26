import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../../../env/environments";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {CredentialResponse, PromptMomentNotification} from "google-one-tap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../../core/validators/custom-validator";
import {SignupFormErrorStateMatcher} from "../../../errors/error-handling";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  googleClientId: string = environment.Google.clientID;

  signupForm!: FormGroup;
  submitted!: boolean;

  invalidEmail!: boolean;
  invalidPassword!: boolean;

  emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});


  constructor(private router: Router,
              private _ngZone: NgZone,
              private authService: AuthService,
              private formBuilder: FormBuilder) {

    this.signupForm = this.formBuilder.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        email: [null, [Validators.required,Validators.min(1)]],
        password: [null,
          [
            Validators.required,
          ]

        ],
        password_repeat: [''],
      },

        {
          validators:
            [
              CustomValidator.checkPasswordValidator,
              CustomValidator.confirmPasswordValidator,
              CustomValidator.emailValidator

            ],
          updateOn:'change'
        }
    )

    this.submitted = false;

    this.handleInvalidControls();

  }


  ngOnInit(): void {

    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      this.initGoogleButton();

      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {
      })
    }

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
    this.initGoogleButton();

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
      {theme: "outline", size: "large", width: 300}
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


}
