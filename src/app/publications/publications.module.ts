import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationComponent } from './components/publication/publication.component';



@NgModule({
  declarations: [
    PublicationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PublicationComponent
  ]
})
export class PublicationsModule { }
