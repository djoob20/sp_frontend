import {HelperService} from 'src/app/core/services/helper.services';
import {ArticleService} from 'src/app/core/services/article.service';
import {CourseService} from 'src/app/core/services/course.services';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserProfile} from "../../../core/models/user-profile.models";
import {AuthService} from "../../../core/services/auth.service";
import {map, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  activeArticleTitle!: string;
  activeCourseTitle!: string;

  userProfile!: UserProfile | undefined;

  private destroy$ = new Subject<boolean>();

  constructor(private router: Router,
              private courseService: CourseService,
              private articleService: ArticleService,
              private helperService: HelperService,
              private authService: AuthService) {

    const user = sessionStorage.getItem('userProfile');
    if(user){
      this.userProfile = new UserProfile();
      this.userProfile.firstname = JSON.parse(user).firstname;
      this.userProfile.lastname = JSON.parse(user).lastname;
      this.userProfile.imageUrl = JSON.parse(user).imageUrl;
    }


  }

  ngOnInit(): void {
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
