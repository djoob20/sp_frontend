import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RegisterUser} from "../models/register-user.models";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    SERVER_URL: string = 'https://localhost:7229/api/Auth/register'

    constructor(private http: HttpClient) {
    }

    addNewUser(formValue: { firstname: string, lastname: string, email: string, password: string, password_repeat: string, role?: string }): Observable<RegisterUser> {
        const header = new HttpHeaders().set('content-type', 'application/json');
        let newUser = new RegisterUser();
        newUser.firstname = formValue.firstname;
        newUser.lastname = formValue.lastname;
        newUser.email = formValue.email;
        newUser.password = formValue.password;
        newUser.confirmPassword = formValue.password_repeat;
        newUser.role = "user";
        return this.http.post<RegisterUser>(`${this.SERVER_URL}`, newUser, {headers: header});


    }

}



