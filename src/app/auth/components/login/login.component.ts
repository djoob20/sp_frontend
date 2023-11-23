import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../../../env/environments";
import {Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {CredentialResponse, PromptMomentNotification} from "google-one-tap";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit{

  googleClientId: string = environment.Google.clientID;

  @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});

  constructor(private router: Router,
              private _ngZone: NgZone,
              private authService: AuthService) {

  }


  ngOnInit(): void {

    // @ts-ignore
    window.onGoogleLibraryLoad = () =>{
      // @ts-ignore
      this.initGoogleButton();

      // @ts-ignore
      google.accounts.id.prompt((notification:PromptMomentNotification) => {})
    }
  }

  async handleCredentialResponse(response: CredentialResponse){
    this.authService.loginWithGoogle(response.credential).subscribe(

      (x:any)=>{
        localStorage.setItem('token', x.token);
       this.authService.setToken(x.token);
        this._ngZone.run(() =>{
          this.router.navigateByUrl('/home');
        })
      },
      (error:any) =>{
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

    const GB = document.getElementById('google-btn');
    if (GB){
      GB.classList.add('btn-google');
    }

  }


  initGoogleButton(): void{
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
      ux_mode:"popup"
    });

    // @ts-ignore
    google.accounts.id.renderButton(
      this.googleButton.nativeElement,
      {theme:"filled_blue", size: "large", width:100}

    )

  }

  login() {
    this.handleCredentialResponse.bind(this);
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true
    });
  }
}
