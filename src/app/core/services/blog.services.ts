import { HelperService } from 'src/app/core/services/helper.services';
import { Injectable } from "@angular/core";
import { Blog } from "../models/blog.models";

@Injectable({
  providedIn: 'root'
})

export class BlogService{

  constructor(private helperService: HelperService){

  }

  blogs:Blog[] = [
    {
      id: 1,
      title: 'Blog 1',
      description: 'Blog 1 avec un peu de contenu pour voir ce ca donne',
      messages: 'blog1 messages',
      createdDate: new Date(),
      creator: 'creator1'
    },
    {
      id: 2,
      title: 'Blog 2',
      description: 'Blog 2 avec un peu de contenu pour voir ce ca donne',
      messages: 'blog2 messages',
      createdDate: new Date(),
      creator: 'creator2'
    },
    {
      id: 3,
      title: 'Blog 3',
      description: 'Blog 3 avec un peu de contenu pour voir ce ca donne',
      messages: 'blog3 messages',
      createdDate: new Date(),
      creator: 'creator3'
    },
    {
      id: 4,
      title: 'Blog 4',
      description: 'Blog 4 avec un peu de contenu pour voir ce ca donne',
      messages: 'blog4 messages',
      createdDate: new Date(),
      creator: 'creator4'
    }
  ]

  // getFaceSnapById(id:number): Observable<Blog>{
  //   return this.http.get<Blog>(`${this.SERVER_URL}/${id}`);
  // }

  findBlogById(id:number):Blog{
    const blog = this.blogs.find(blog => blog.id === id);
    if (!blog){
      throw new Error("Blog not found!");
    }else{
      return blog;
    }
  }

  findBlogByTitle(title:string):Blog{
    const t = this.helperService.filterTitle(title);
    const blog = this.blogs.find(blog => this.helperService.filterTitle(blog.title) === t);
    if (!blog){
      throw new Error("Blog not found!");
    }else{
      return blog;
    }
  }


  getAllBlogs(): Blog[]{
    return this.blogs;
  }
}
