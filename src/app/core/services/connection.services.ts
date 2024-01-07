import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../env/environments";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ConnectionService{

  constructor(private http: HttpClient) {
  }


  isBackendIsAvailable():Observable<any>{

    return this.http.get(environment.apiUrl+ '/api/connection/getApiState',
      {responseType: 'text'});
  }
}
