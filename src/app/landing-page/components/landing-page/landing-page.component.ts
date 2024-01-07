import {HelperService} from 'src/app/core/services/helper.services';
import {ArticleService} from 'src/app/core/services/article.service';
import {CourseService} from 'src/app/core/services/course.services';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthUser} from "../../../core/models/auth-user.models";
import {first, interval, Subject} from "rxjs";
import {environment} from "../../../../env/environments";
import {ConnectionService} from "../../../core/services/connection.services";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  activeArticleTitle!: string;
  activeCourseTitle!: string;

  userProfile!: AuthUser | undefined;

  private destroy$ = new Subject<boolean>();

  constructor(private router: Router,
              private courseService: CourseService,
              private articleService: ArticleService,
              private helperService: HelperService,
              private connectionService: ConnectionService) {

    const user = sessionStorage.getItem('userProfile');
    if(user){
      this.userProfile = new AuthUser();
      this.userProfile.firstname = JSON.parse(user).firstname;
      this.userProfile.lastname = JSON.parse(user).lastname;
      this.userProfile.imageUrl = JSON.parse(user).imageUrl;
    }


  }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.helperService.setSecondaryFooterStyle(true);

    this.courseService.courseSub.subscribe(value => {
      this.activeCourseTitle = this.helperService.filterTitle(value.title);
    });

    this.articleService.articleSub.subscribe(value => {
      this.activeArticleTitle = this.helperService.filterTitle(value.title);
    });
  }

  ngOnDestroy(): void {
    this.helperService.setSecondaryFooterStyle(false);
    this.destroy$.next(true);
  }

  onLogin(): void {
    this.router.navigateByUrl('/auth/login');
  }

  onSignup(): void {
    this.router.navigateByUrl('/auth/login');
  }

  onShowCourse(): void {
    this.helperService.setActiveTopic('cours');
  }

  onShowArticle(): void {
    this.helperService.setActiveTopic('article');
  }


}
