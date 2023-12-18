import {NavigationEnd, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {BehaviorSubject, filter} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public activeTopic$ = new BehaviorSubject<string>('');
  public isSecondaryFooterStyle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
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
