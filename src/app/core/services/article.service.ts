import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, switchMap} from 'rxjs';
import {Article} from '../models/article.models';
import {HelperService} from './helper.services';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  SERVER_BASE_URL: string = "https://localhost:7229/api/Article";

  private article!: Article | undefined;

  public articleSub!: BehaviorSubject<Article>;

  constructor(
    private http: HttpClient,
    private helperService: HelperService) {

    this.initArticle();


  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.SERVER_BASE_URL);
  }

  findArticleById(articleId: string): Observable<Article> {
    const lastActiveCourse$ = this.http.get<Article>(`${this.SERVER_BASE_URL}/${articleId}`);
    lastActiveCourse$.pipe(
      switchMap(async (article) => {
        //Store last active article for LSM
        localStorage.setItem('laa', JSON.stringify(article));
      })
    ).subscribe();
    return this.http.get<Article>(`${this.SERVER_BASE_URL}/${articleId}`);
  }

  findCourseByTitle(title: string) {
    return this.getAllArticles().pipe(
      map(value => {
        let course = value.filter(c => this.helperService.filterTitle(c.title) === title)
        return (course.length > 0) ? course[0] : null;
      })
    )

  }

  initArticle(): void {
    //Pick last stored article
    const lastActiveArticle = JSON.parse(localStorage.getItem('laa') || '{}');

    this.getAllArticles().pipe(
      switchMap(async (value) => this.article = value.at(0))
    );

    if (lastActiveArticle) {
      this.articleSub = new BehaviorSubject<Article>(lastActiveArticle);
    } else if (this.article) {
      this.articleSub = new BehaviorSubject<Article>(this.article);
    }
  }
}



