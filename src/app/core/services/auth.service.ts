import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, takeUntil, tap} from "rxjs";
import {environment} from "../../../env/environments";
import {RegisterUser} from "../models/register-user.models";
import {AuthUser} from "../models/auth-user.models";
import {UserIdleService} from "angular-user-idle";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl: string = environment.apiUrl;
  private token!: string;

  public userProfile$ = new BehaviorSubject<string>('');

  private requestHeaders = new HttpHeaders().set('content-type', 'application/json');

  private newUser!: RegisterUser;

  loggedOut$ = new Subject<boolean>();

  constructor(private http: HttpClient,
              private userIdle: UserIdleService,
              private router: Router) {


  }

  loginWithGoogle(credentials: string): Observable<any> {

    return this.http.post(
      this.apiBaseUrl + '/api/Auth/loginWithGoogle',
      JSON.stringify(credentials),
      {headers: this.requestHeaders}
    )
  }

  registerNewUser(formValue: {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password_repeat: string,
    role?: string
  }): Observable<any> {
    this.newUser = {
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.password_repeat,
      role: "utilisateur"
    }

    return this.http.post(
      this.apiBaseUrl + '/api/Auth/register',
      this.newUser,
      {headers: this.requestHeaders}
    );


  }


  public setToken(token: string): void {
    this.token = token;

  }

  public getToken(): string {
    return this.token;

  }

  setUserProfile(value: any) {
    this.userProfile$.next(value);
  }

  storeUserProfile(firstname: string, lastname: string, token: string, imageUrl?: string): void {
    const userProfile = {
      firstname: firstname,
      lastname: lastname,
      token: token,
      imageUrl: imageUrl,
      isLoggedIn: true

    }

    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    sessionStorage.setItem('token', userProfile.token);
    this.userProfile$.next(JSON.stringify(userProfile));
  }

  logout(): void {
    this.loggedOut$.next(true);
    this.setUserProfile(undefined);
    sessionStorage.removeItem("userProfile");
    sessionStorage.removeItem("token");

    this.stop();
    this.stopWatching();

    this.router.navigateByUrl('/auth/login')
      .then(r => console.log(r)).catch(e => console.log(e));

  }

  login(formValue: { email: string, password: string }): Observable<any> {
    return this.http.post(this.apiBaseUrl + '/api/Auth/login',
      formValue,
      {headers: this.requestHeaders}
    );
  }

  getImagePath(imageUrl: string): Observable<any> {
    return this.http.get(imageUrl);
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }


}
