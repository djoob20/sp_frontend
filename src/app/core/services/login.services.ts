import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../models/user.models";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    SERVER_URL: string = 'https://localhost:7229/api/Auth/register'

    constructor(private http: HttpClient) {
    }

    addNewUser(formValue: { firstname: string, lastname: string, email: string, password: string, password_repeat: string, role?: string }): Observable<User> {
        const header = new HttpHeaders().set('content-type', 'application/json');
        let newUser = new User();
        newUser.firstname = formValue.firstname;
        newUser.lastname = formValue.lastname;
        newUser.email = formValue.email;
        newUser.password = formValue.password;
        newUser.confirmPassword = formValue.password_repeat;
        newUser.role = "user";
        return this.http.post<User>(`${this.SERVER_URL}`, newUser, {headers: header});


    }

}



