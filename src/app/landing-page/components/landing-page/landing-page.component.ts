import { HelperService } from 'src/app/core/services/helper.services';
import { ArticleService } from 'src/app/core/services/article.service';
import { CourseService } from 'src/app/core/services/course.services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  activeArticleTitle!: string;
  activeCourseTitle!: string;

  constructor(private router: Router,
              private courseService: CourseService,
              private articleService: ArticleService,
              private helperService: HelperService){

  }
  ngOnInit(): void {
    this.courseService.courseSub.subscribe(value =>{
      this.activeCourseTitle = this.helperService.filterTitle(value.title);
    });

    this.articleService.articleSub.subscribe(value =>{
      this.activeArticleTitle = this.helperService.filterTitle(value.title);
    });
  }

  onLogin():void{
    this.router.navigateByUrl('/login');
  }

  onSignup():void{
    this.router.navigateByUrl('/signup');
  }

  onShowCourse():void{
    this.helperService.setActiveTopic('cours');
  }

  onShowArticle():void{
    this.helperService.setActiveTopic('article');
  }

}
