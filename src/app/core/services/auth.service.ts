import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../env/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path: string = environment.apiUrl;
  private token! :string;

  constructor(private http: HttpClient) { }

  loginWithGoogle(credentials: string):Observable<any>{
    const header = new HttpHeaders().set('content-type', 'application/json');

    return this.http.post(
      this.path + '/api/Auth/loginWithGoogle',
      JSON.stringify(credentials),
      {headers:header}
    );
  }


  public setToken(token: string):void
  {
    this.token = token;

  }

  public getToken():string
  {
    return this.token;

  }
}
