import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.isLoggedIn()){
      return true;
    }

    this.router.navigateByUrl('/auth/login');
    return false;
  }

  public isLoggedIn(): boolean {
    const userProfile = sessionStorage.getItem('userProfile');
    return !!userProfile;

  }

}
