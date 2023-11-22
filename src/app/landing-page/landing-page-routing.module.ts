import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";

const routes:Routes = [
  {path:'home', component: LandingPageComponent},
  {path:'', component: LandingPageComponent}
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LandingPageRoutingModule { }
