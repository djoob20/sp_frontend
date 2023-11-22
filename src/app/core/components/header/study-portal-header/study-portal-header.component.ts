import { HelperService } from './../../../services/helper.services';
import { ArticleService } from 'src/app/core/services/article.service';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/course.services';

@Component({
  selector: 'app-study-portal-header',
  templateUrl: './study-portal-header.component.html',
  styleUrls: ['./study-portal-header.component.scss']
})
export class StudyPortalHeaderComponent implements OnInit{

  activeCourseTitle!: string;
  activeArticleTitle!: string;

  isShowMenuItem:boolean = false;

  constructor(private courseService: CourseService,
              private articleService: ArticleService,
              private helperService: HelperService){

  }

  ngOnInit(): void {
    this.courseService.courseSub.subscribe(value =>{
      if(value){
        this.activeCourseTitle = this.helperService.filterTitle(value.title);
      }
    });

    this.articleService.articleSub.subscribe(value =>{
      this.activeArticleTitle = this.helperService.filterTitle(value.title);
    });
  }

  onShowMenuItem():void{
      this.isShowMenuItem = !this.isShowMenuItem;
  }

  onShowCourse():void{
    this.helperService.setActiveTopic('cours');
    this.isShowMenuItem = !this.isShowMenuItem;
  }

  onShowArticle():void{
    this.helperService.setActiveTopic('article');
    this.isShowMenuItem = !this.isShowMenuItem;
  }

}
