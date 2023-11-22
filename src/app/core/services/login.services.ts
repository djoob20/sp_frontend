import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private router: Router) {


  }

  ngOnInit(): void {

  }

  onSignupWithGithub(): void {

  }

  onSignup(): void {
    this.router.navigateByUrl('/signup');
  }

  onCancel(): void {
    this.router.navigateByUrl('/home');
  }


  onSignInWithGoogle(): void {

  }

  signOut(): void {

  }


}



