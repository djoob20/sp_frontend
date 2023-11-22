import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {AuthModule} from "./auth.module";

const routes:Routes = [
  {path:'auth/login', component: LoginComponent}
]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule, AuthModule]
})

export class AuthRoutingModule{

}
