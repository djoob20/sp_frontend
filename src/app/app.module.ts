import { LandingPageModule } from './landing-page/landing-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BlogsModule } from './blogs/blogs.module';
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {httpInterceptorProvides} from "./core/interceptors";
import {TopicModule} from "./study-portal-topic-container/topic.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BlogsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProvides
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
