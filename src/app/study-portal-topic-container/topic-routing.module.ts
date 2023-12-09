import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AddNewCourseComponent } from "../courses/components/add-new-course/add-new-course.component";
import { StudyPortalTopicContainerComponent } from "./components/study-portal-topic-container.component";
import { NgModule } from "@angular/core";
import {AuthGuard} from "../core/guards/auth.guards";

const routes: Routes = [
  {path:'create', component: AddNewCourseComponent, /*canActivate:[AuthGuard]*/},
  {path:':title', component: StudyPortalTopicContainerComponent, /*canActivate:[AuthGuard]*/},
  {path:'', component: StudyPortalTopicContainerComponent, /*canActivate:[AuthGuard]*/}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TopicRoutingModule{}
