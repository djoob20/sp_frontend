import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../materials/material.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations:[
      LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports:[
      LoginComponent
    ]
})

export class AuthModule {}
