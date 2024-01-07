import {NavigationEnd, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, first, interval} from 'rxjs';
import {environment} from "../../../env/environments";
import {ConnectionService} from "./connection.services";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public activeTopic$ = new BehaviorSubject<string>('');
  public isSecondaryFooterStyle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isPageAvailable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isServerAvailable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);


  private source = interval(
    environment.corePingIntervalSeconds * 1000
  );
  constructor(private router: Router,
              private connectionService:ConnectionService ) {

    this.handleNavigation();

    this.checkBackendServer();
  }


  private checkBackendServer() {
    // this.source.subscribe(() => {
      this.connectionService
        .isBackendIsAvailable()
        .pipe(first())
        .subscribe(resp => {
          console.log("RESPONSE BACKEND: " + resp)
          this.router.navigateByUrl('/home');

        }, err => {
          console.log("ERROR SERVER: " + err.error);
          this.router.navigateByUrl('/server-not-available');
        });
    // });
  }

  private handleNavigation() {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
          console.log("eventID: " + event.id);
          console.log("event url: " + event.url);
          if (event.id === 1 && event.url === event.urlAfterRedirects) {
            console.log("Helper service constructor");
            if (this.router.url.includes('/cours/')) {
              this.activeTopic$ = new BehaviorSubject<string>('cours');
            } else if (this.router.url.includes('/article/')) {
              this.activeTopic$ = new BehaviorSubject<string>('article');
            } else if (this.router.url.includes('/article/')) {
              this.activeTopic$ = new BehaviorSubject<string>('publication');
            }
          }
        },
        error => {
          console.log("Error url: " + error)
        })
  }

  filterTitle(title: string): string {
    return title.trim().replaceAll(' ', '-');

  }

  setActiveTopic(topic: 'cours' | 'article' | 'publication'): void {
    this.activeTopic$.next(topic);
  }

  setSecondaryFooterStyle(value: boolean) {
    this.isSecondaryFooterStyle$.next(value);
  }


}
