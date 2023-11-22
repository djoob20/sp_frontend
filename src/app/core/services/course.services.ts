import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, map, mergeMap, switchMap, tap } from "rxjs";
import { Course } from "../models/course.models";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HelperService } from './helper.services';


@Injectable({
  providedIn: 'root'
})
export class CourseService{

  private SERVER_URL: string = 'https://localhost:7229/api/Course';

  course!:Course | undefined;
  public courseSub!: BehaviorSubject<Course>;


  constructor(private http: HttpClient,
    private router: Router,
    private helperService: HelperService) {
    console.log("Browser back");
    this.initCourse();

  }


  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.SERVER_URL);
  }

  findCourseById(courseId: string): Observable<Course>{
    const lastActiveCourse$ = this.http.get<Course>(`${this.SERVER_URL}/${courseId}`);
    lastActiveCourse$.pipe(
      switchMap(async (course) => {
        localStorage.setItem('lac', JSON.stringify(course));
      }),
    ).subscribe();

    return this.http.get<Course>(`${this.SERVER_URL}/${courseId}`);
  }

  findCourseByTitle(title: string){
    return this.getAllCourses().pipe(
      map(value  => {
        let course = value.filter(c => this.helperService.filterTitle(c.title) === title)
        return (course.length > 0) ? course[0] : null;
      })
    )

  }

  initCourse():void{
    const lastActiveCourse = JSON.parse(localStorage.getItem('lac') || '{}');

    this.getAllCourses().pipe(
      switchMap(async (value) => this.course = value.at(0))
    );

    if(lastActiveCourse){
      this.courseSub = new BehaviorSubject<Course>(lastActiveCourse);
    }else if(this.course){
      this.courseSub = new BehaviorSubject<Course>(this.course);
    }

  }
}


