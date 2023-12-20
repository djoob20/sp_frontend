import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../env/environments";
import {User} from "../models/user.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl: string = environment.apiUrl;
  private token!: string;

  public userProfile$ = new BehaviorSubject<string>('');

  private requestHeaders = new HttpHeaders().set('content-type', 'application/json');

  private newUser!:User;

  constructor(private http: HttpClient) {
  }

  loginWithGoogle(credentials: string): Observable<any> {

    return this.http.post(
      this.apiBaseUrl + '/api/Auth/loginWithGoogle',
      JSON.stringify(credentials),
      {headers: this.requestHeaders}
    )
  }

  registerNewUser(formValue: { firstname: string, lastname: string, email: string, password: string, password_repeat: string, role?: string }): Observable<any> {

    this.newUser = new User();
    this.newUser.firstname = formValue.firstname;
    this.newUser.lastname = formValue.lastname;
    this.newUser.email = formValue.email;
    this.newUser.password = formValue.password;
    this.newUser.confirmPassword = formValue.password_repeat;
    this.newUser.role = "user";

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

  logout():void{
    this.setUserProfile(undefined);
    sessionStorage.removeItem("loggedInUser");
  }
}
