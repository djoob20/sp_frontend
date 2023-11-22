import { HelperService } from './../../../core/services/helper.services';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subject, concatMap, filter, mergeMap, switchMap, take, takeUntil } from 'rxjs';
import { Course } from 'src/app/core/models/course.models';
import { CourseService } from 'src/app/core/services/course.services';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnDestroy{

  @Input() course!: Course;

  course$!: Observable<Course>;

  private url!: string;

  private destroy$ = new Subject<boolean>;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private helperService: HelperService
  ) {

    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe((event:NavigationEnd) => {
        takeUntil(this.destroy$)
        this.url = event.url.substring(event.url.lastIndexOf('/') + 1, event.url.length);
        if (this.router.url.includes('/cours/')){
          this.courseService.findCourseByTitle(decodeURI(this.url)).pipe(

            concatMap(async (value) => {
              if (value) {
                this.courseService.courseSub.next(value);
                localStorage.setItem('lac', JSON.stringify(value));
              }
            }),

          ).subscribe();

          this.helperService.setActiveTopic('cours');

        }else if (this.router.url.includes('/article/')){
          this.helperService.setActiveTopic('article');
        }
      });

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


  onShowCourseContent() {
    const courseTitle = this.helperService.filterTitle(this.course.title);
    localStorage.setItem('lastID', this.course.id);
    this.router.navigateByUrl(`cours/${courseTitle}`);
    this.course$ = this.courseService.findCourseById(this.course.id);
    console.log('onShowCourseContent(): ' + this.course.title);
    this.courseService.courseSub.next(this.course);
  }

}
