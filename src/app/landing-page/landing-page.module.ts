import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {LandingPageRoutingModule} from "./landing-page-routing.module";



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    LandingPageRoutingModule,
    CommonModule,
    RouterModule

  ],
  exports: [
    LandingPageComponent
  ],
})
export class LandingPageModule { }
