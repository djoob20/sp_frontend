import {HelperService} from '../../../services/helper.services';
import {ArticleService} from 'src/app/core/services/article.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from 'src/app/core/services/course.services';
import {AuthService} from "../../../services/auth.service";
import {UserProfile} from "../../../models/user-profile.models";
import {map, Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-study-portal-header',
  templateUrl: './study-portal-header.component.html',
  styleUrls: ['./study-portal-header.component.scss']
})
export class StudyPortalHeaderComponent implements OnInit, OnDestroy {

  activeCourseTitle!: string;
  activeArticleTitle!: string;

  isShowMenuItem: boolean = false;

  userProfile!: UserProfile;

  destroy$ = new Subject<boolean>();
  showDropdown: boolean = false;


  constructor(private courseService: CourseService,
              private articleService: ArticleService,
              private helperService: HelperService,
              private authService: AuthService) {


    this.authService.userProfile$.pipe(
      takeUntil(this.destroy$),
      map((value: string) => {
        if (value) {
          console.log(JSON.parse(value.toString()))
          this.userProfile = new UserProfile();
          this.userProfile.givenName = JSON.parse(value).name;
          this.userProfile.imageUrl = JSON.parse(value).picture;
          console.log(this.userProfile.givenName);
        }
      })
    ).subscribe()

    document.addEventListener('click', (event) =>{
      // @ts-ignore
      if (!event.target.matches('.dropbtn')) {
        this.showDropdown = false;
      }
    })


  }


  ngOnInit(): void {
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
}
