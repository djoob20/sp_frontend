import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { StudyPortalTopicContainerComponent } from './components/study-portal-topic-container.component';
import { CoursesModule } from '../courses/courses.module';
import { ArticlesModule } from '../articles/articles.module';
import { TopicRoutingModule } from './topic-routing.module';
import {CourseComponent} from "../courses/components/course/course.component";
import {ArticleComponent} from "../articles/components/article/article.component";

@NgModule(
  {
    declarations: [StudyPortalTopicContainerComponent],
    imports: [
      CommonModule,
      CoursesModule,
      ArticlesModule,
      RouterModule,
      TopicRoutingModule
    ],
    exports: [StudyPortalTopicContainerComponent]

  } )

export class TopicModule{

}
