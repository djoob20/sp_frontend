import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../../../env/environments";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {CredentialResponse} from "google-one-tap";
import {CustomValidator} from "../../../core/validators/custom-validator";
import {HelperService} from "../../../core/services/helper.services";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

    private googleClientId: string = environment.Google.clientID;

    //Form groups
    signupForm!: FormGroup;
    signInForm!: FormGroup;

    submitted!: boolean;

    invalidEmail!: boolean;
    invalidPassword!: boolean;
    invalidUserName!: boolean;

    errorLogin!:boolean;

    registrationErrorMessage:string | undefined;

    @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});

    private signInLink = document.getElementById('signin-link');

    constructor(private router: Router,
                private _ngZone: NgZone,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private helperService: HelperService,
                private responsive: BreakpointObserver) {


        //Validate Signup form
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
                        CustomValidator.firstnameValidator,
                        CustomValidator.lastnameValidator,
                        CustomValidator.checkPasswordValidator,
                        CustomValidator.confirmPasswordValidator,
                        CustomValidator.emailValidator,

                    ],
                updateOn: 'change'
            }
        );

        //Validate Sign-in Form
        this.signInForm = this.formBuilder.group({

                email: [null, [Validators.required, Validators.min(1)]],
                password: [null, Validators.required]
            },
            {
                validators:
                    [
                        CustomValidator.checkPasswordValidator,
                        CustomValidator.emailValidator

                    ],
                updateOn: 'blur'
            }
        );

        //reset submitted
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

        //Handle responsive design while resizing
        this.responsive
            .observe([Breakpoints.HandsetPortrait])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    console.log('state: ' + state.matches)
                    this.showOrHideSignupForm('hide');


                    if (this.signInLink) {
                        this.signInLink.classList.add('show');
                    }
                } else {
                    this.showOrHideSignupForm('show')
                    if (this.signInLink) {
                        this.signInLink.classList.add('hide');
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
            this.submitted = false;
        });

        // @ts-ignore
        signInButton.addEventListener('click', () => {
            // @ts-ignore
            container.classList.remove("right-panel-active");
            this.submitted = false;

        });

        this.submitted = false;
    }

    async handleCredentialResponse(response: CredentialResponse) {
        this.authService.loginWithGoogle(response.credential).subscribe(
            (x: any) => {

                // to decode the credential response.
                const responsePayload = this.decodeJWTToken(response.credential);
                const authUser = JSON.stringify(responsePayload);

                const userProfile = JSON.parse(authUser);

                if(userProfile){
                 this.authService.storeUserProfile(userProfile.given_name,
                                       userProfile.family_name,
                                       x.token,
                                       userProfile.picture
                                      );
                }

                this.goToHome();
            },


            (error: any) => {
                console.log(error.error)
            }
        )


    }

    private goToHome() {
        this._ngZone.run(() => {
            this.router.navigateByUrl('/home');
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

        })
    }

    decodeJWTToken(token: any): JSON {
        return JSON.parse(atob(token.split(".")[1]));
    }


    onSignup() {
        this.submitted = true;

        this.resetControlValidator();
        if (this.signupForm.invalid) {
            this.handleInvalidControls();
        } else {
            //TODO Post registration
            this.authService.registerNewUser(this.signupForm.value).subscribe(
                authUser => {
                   this.handleAuthentication(authUser);
                },
                error => {
                    this.registrationErrorMessage = "error";

                }
            )

        }
    }

    onCancel() {

    }

    onLogin() {
        this.submitted = true;
        this.resetControlValidator();
        if (this.signInForm.invalid) {
            this.handleInvalidControls();
        }else{
            this.authService.login(this.signInForm.value).subscribe(
                authUser => {
                    this.errorLogin = false;
                    this.handleAuthentication(authUser);

                },
                error => {
                    this.errorLogin = true;
                }
            )
        }
    }

    private handleAuthentication(authUser:any) {

        this.authService.storeUserProfile(authUser.firstname, authUser.lastname, authUser.token, authUser.imageUrl);
        this.goToHome();
    }

    ngAfterViewInit(): void {
        this.initGoogleButton();

        const GB = document.getElementById('google-btn');
        if (GB) {
            GB.classList.add('btn-google');
        }

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


    private resetControlValidator(): void {
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.invalidUserName = false;
    }

    public handleInvalidControls() {
        const controls = this.signupForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                switch (name) {
                    case "firstname":
                        this.invalidUserName = true;
                        break;
                    case "lastname":
                        this.invalidUserName = true;
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
                        this.invalidUserName = false;
                        break;
                }

            }
        }

    }


    showOrHideSignupForm(value: 'show' | 'hide') {
        const signup = document.getElementById('sign-up-container');

        if (signup) {
            signup.classList.add(value);
        }

    }

    onShowSignupForm() {
        const signup = document.getElementById('sign-up-container');
        const signIn = document.getElementById('sign-in-container');
        const container = document.getElementById('container');

        if (signup) {
            // @ts-ignore
            container.classList.add("right-panel-active");
            // @ts-ignore
            container.classList.remove("left-panel-active");
            signup.classList.remove('hide');
            signup.classList.add('show');

        }

        if (signIn) {
            signIn.classList.add('hide');
            signIn.classList.remove('show')
        }
    }

    onShowSignInForm() {
        const signup = document.getElementById('sign-up-container');
        const signIn = document.getElementById('sign-in-container');
        const container = document.getElementById('container');

        if (container) {
            container.classList.remove("right-panel-active");
            container.classList.add("left-panel-active");
        }

        if (signup) {
            signup.classList.add('hide');
            signup.classList.remove('show');
        }


        if (signIn) {
            signIn.classList.remove('hide');
            signIn.classList.add('show')
        }

    }



}
