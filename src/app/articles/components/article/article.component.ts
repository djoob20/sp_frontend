import { Component, Input, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, filter, mergeMap, switchMap, take } from 'rxjs';
import { Article } from 'src/app/core/models/article.models';
import { ArticleService } from 'src/app/core/services/article.service';
import { HelperService } from 'src/app/core/services/helper.services';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnDestroy{

  @Input() article!: Article;
  article$!: Observable<Article>;

  private destroy$ = new Subject<boolean>;

  private url!:string;

  constructor(private router: Router,
              private articleService: ArticleService,
              private helperService: HelperService){
                this.router.events
                .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
                .subscribe((event) => {
                  take(1)
                  this.url = event.url.substring(event.url.lastIndexOf('/') + 1,event.url.length);
                  console.log("Article: Url after back: " + decodeURI(this.url));
                  if (this.router.url.includes('/article/')){
                    this.articleService.findCourseByTitle(decodeURI(this.url)).pipe(

                      switchMap(async (value) => {
                        if (value) {
                          this.articleService.articleSub.next(value);
                          //Store last active article for LSM
                          localStorage.setItem('laa', JSON.stringify(value));
                        }
                      }),

                    ).subscribe();

                    this.helperService.setActiveTopic('article');

                  }else if (this.router.url.includes('/cours/')){
                    this.helperService.setActiveTopic('cours');
                  }
                });
              }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


  onShowArticleContent() {
    const articleTitle = this.helperService.filterTitle(this.article.title);
    this.router.navigateByUrl(`article/${articleTitle}`);
    this.article$ = this.articleService.findarticleById(this.article.id);
    this.articleService.articleSub.next(this.article);
  }
}
