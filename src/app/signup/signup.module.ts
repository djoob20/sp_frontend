import {NgModule} from "@angular/core";
import {SignupComponent} from "./components/signup.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations:[SignupComponent],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatCardModule
    ],
  exports:[SignupComponent]
})

export class SignupModule{}
