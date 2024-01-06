import {HelperService} from '../../../services/helper.services';
import {ArticleService} from 'src/app/core/services/article.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from 'src/app/core/services/course.services';
import {AuthService} from "../../../services/auth.service";
import {AuthUser} from "../../../models/auth-user.models";
import {map, Subject, takeUntil, tap} from "rxjs";


@Component({
  selector: 'app-study-portal-header',
  templateUrl: './study-portal-header.component.html',
  styleUrls: ['./study-portal-header.component.scss']
})
export class StudyPortalHeaderComponent implements OnInit, OnDestroy {

  activeCourseTitle!: string;
  activeArticleTitle!: string;

  isShowMenuItem: boolean = false;

  userProfile!: AuthUser;

  destroy$ = new Subject<boolean>();
  showDropdown: boolean = false;


  constructor(private courseService: CourseService,
              private articleService: ArticleService,
              private helperService: HelperService,
              private authService: AuthService) {

    this.userProfile = new AuthUser();

    this.authService.userProfile$.pipe(

      map((value: string) => {
        if (value) {
          console.log("User Profile in Header:" + value)
          this.userProfile.firstname = JSON.parse(value).firstname;
          this.userProfile.lastname = JSON.parse(value).lastname;
          this.userProfile.imageUrl = JSON.parse(value).imageUrl;
          this.userProfile.isLoggedIn = JSON.parse(value).isLoggedIn === true;

          console.log('user image: ' + this.userProfile.imageUrl)

        } else {
          this.userProfile.isLoggedIn = false;
        }
      })
    ).subscribe()

    document.addEventListener('click', (event) => {
      // @ts-ignore
      if (!event.target.matches('.dropbtn')) {
        this.showDropdown = false;
      }
    })


  }


  ngOnInit(): void {
    const user = sessionStorage.getItem('userProfile');
      this.userProfile = new AuthUser();
    if (user) {
      this.userProfile.firstname = JSON.parse(user).firstname;
      this.userProfile.lastname = JSON.parse(user).lastname;
      this.userProfile.isLoggedIn = JSON.parse(user).isLoggedIn === true;
      this.userProfile.imageUrl = JSON.parse(user).imageUrl;
    } else {
      this.userProfile.isLoggedIn = false;
    }

    console.log('USER PROFILE: ' + JSON.stringify(this.userProfile));
    this.courseService.courseSub.subscribe(value => {
      if (value) {
        this.activeCourseTitle = this.helperService.filterTitle(value.title);
      }
    });

    this.articleService.articleSub.subscribe(value => {
      this.activeArticleTitle = this.helperService.filterTitle(value.title);
    });


  }

  onShowMenuItem(): void {
    this.isShowMenuItem = !this.isShowMenuItem;
  }

  onShowCourse(): void {
    this.helperService.setActiveTopic('cours');
    this.isShowMenuItem = !this.isShowMenuItem;
  }

  onShowArticle(): void {
    this.helperService.setActiveTopic('article');
    this.isShowMenuItem = !this.isShowMenuItem;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  onToggleDropdown() {
    this.showDropdown = !this.showDropdown;

  }

  onLogout() {
    this.authService.logout();

  }
}
