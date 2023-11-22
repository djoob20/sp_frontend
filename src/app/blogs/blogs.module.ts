import { BlogListComponent } from './components/blog-list/blog-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './components/blog/blog.component';
import { RouterModule } from '@angular/router';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';



@NgModule({
  declarations: [
    BlogComponent,
    BlogListComponent,
    SingleBlogComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    BlogComponent,
    BlogListComponent,
    SingleBlogComponent
  ]
})
export class BlogsModule { }
