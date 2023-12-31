import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`)
      .append('Content-Type','application/json');
    const modifiedReq = req.clone({headers});
    console.log(localStorage.getItem('token'))
    return next.handle(modifiedReq);

  }
}
