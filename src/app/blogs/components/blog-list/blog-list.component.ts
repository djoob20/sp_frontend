import { Blog } from 'src/app/core/models/blog.models';
import { BlogService } from './../../../core/services/blog.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit{

  blogs!:Blog[];

  constructor(private blogService: BlogService){

  }
  ngOnInit(): void {
     this.blogs = this.blogService.getAllBlogs();
  }



}
