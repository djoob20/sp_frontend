import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/core/models/blog.models';
import { HelperService } from 'src/app/core/services/helper.services';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})


export class BlogComponent implements OnInit{

  @Input() blog!: Blog;

  constructor(private helperService: HelperService,
              private router:Router){
    // this.blogTitle = this.helperService.filterTitle(this.blog.title);
  }
  ngOnInit(): void {
  }

  onGoToBlog():void{
    const blogTitle = this.helperService.filterTitle(this.blog.title);
    console.log("BLOG TITLE: " + blogTitle);
    this.router.navigateByUrl(`blog/${blogTitle}`);
  }

}
