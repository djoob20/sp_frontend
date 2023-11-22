import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseComponent} from './components/course/course.component';
import {RouterModule} from '@angular/router';
import {AddNewCourseComponent} from './components/add-new-course/add-new-course.component';


@NgModule({
  declarations: [
    CourseComponent,
    AddNewCourseComponent
  ],
  exports: [
    CourseComponent,
    AddNewCourseComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CoursesModule {
}
