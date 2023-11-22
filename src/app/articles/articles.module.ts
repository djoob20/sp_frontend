import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ArticleComponent
  ]
})
export class ArticlesModule { }
