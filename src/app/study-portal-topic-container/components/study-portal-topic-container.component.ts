import {HelperService} from 'src/app/core/services/helper.services';
import {Component} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {Article} from 'src/app/core/models/article.models';
import {Course} from 'src/app/core/models/course.models';
import {ArticleService} from 'src/app/core/services/article.service';
import {CourseService} from 'src/app/core/services/course.services';

@Component({
  selector: 'app-study-portal-topic-container',
  templateUrl: './study-portal-topic-container.component.html',
  styleUrls: ['./study-portal-topic-container.component.scss']
})
export class StudyPortalTopicContainerComponent {

  course!: Course;
  courses$!: Observable<Course[]>;
  activeCourseTitle!: string;
  activeTopic!: string;


  article!: Article;
  articles$!: Observable<Article[]>;
  activeArticleTitle!: string;

  constructor(private courseService: CourseService,
              private articleService: ArticleService,
              private helperService: HelperService
             )
  {

  }

  ngOnInit(): void {

    this.helperService.setSecondaryFooterStyle(false);
    this.courses$ = this.courseService.getAllCourses();
    this.courseService.courseSub.pipe(
      switchMap(async (value) => {
        this.course = value
        this.activeCourseTitle = value.title;
      }),
    ).subscribe();

    this.articles$ = this.articleService.getAllArticles();
    this.articleService.articleSub.pipe(
      switchMap(async (value) => {
        this.article = value;
        this.activeArticleTitle = value.title;
      }),
    ).subscribe();

    this.helperService.activeTopic$.pipe(
      switchMap(async (value) => {
        this.activeTopic = value
      }),
    ).subscribe();

  }

}
