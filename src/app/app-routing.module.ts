import { BlogListComponent } from './blogs/components/blog-list/blog-list.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PublicationComponent } from "./publications/components/publication/publication.component";
import { SingleBlogComponent } from './blogs/components/single-blog/single-blog.component';
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";
import {LoginComponent} from "./auth/components/login/login.component";
import {ServerDownComponent} from "./core/components/server-down/server-down.component";

const routes: Routes = [
  {path: 'cours', loadChildren:() => import('./study-portal-topic-container/topic-routing.module').then(m=> m.TopicRoutingModule)},
  {path: 'article', loadChildren:() => import('./study-portal-topic-container/topic-routing.module').then(m=> m.TopicRoutingModule)},
  {path:'blog/:title', component:SingleBlogComponent},
  {path:'blog', component:BlogListComponent},
  {path:'publication', component: PublicationComponent},
  {path:'home', loadChildren:() => import('./landing-page/landing-page-routing.module').then(m => m.LandingPageRoutingModule)},
  {path:'', loadChildren:() => import('./landing-page/landing-page-routing.module').then(m => m.LandingPageRoutingModule)},
  {path:'auth/login', component:LoginComponent},
  { path: 'server-not-available', component: ServerDownComponent },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
]
@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{

}
