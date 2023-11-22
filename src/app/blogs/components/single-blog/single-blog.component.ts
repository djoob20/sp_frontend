import { HelperService } from './../../../core/services/helper.services';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../../core/services/blog.services';
import { Blog } from './../../../core/models/blog.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})

export class SingleBlogComponent implements OnInit{

  blog!: Blog;
  blogs!:Blog[];

  constructor(private blogService: BlogService,
              private route:ActivatedRoute,
              private helperService: HelperService){

                const blogId:string = this.route.snapshot.params['title'];
                console.log("Single BlogId: " + blogId);

  }
  ngOnInit(): void {
    const blogTitle:string = this.route.snapshot.params['title'];
    this.blog = this.blogService.findBlogByTitle(blogTitle);
    this.blogs = this.blogService.getAllBlogs();

  }

}
