import { LOCALE_ID, NgModule } from '@angular/core';
import * as fr from '@angular/common/locales/fr'
import { CommonModule, registerLocaleData } from '@angular/common';
import { StudyPortalHeaderComponent } from './components/header/study-portal-header/study-portal-header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StudyPortalFooterComponent } from './components/footer/study-portal-footer/study-portal-footer.component';



@NgModule({
  declarations: [
    StudyPortalHeaderComponent,
    StudyPortalFooterComponent

  ],
  imports: [
    CommonModule, //for base diretive like ngIf, ngFor
    HttpClientModule,
    RouterModule
  ],
  exports: [
    StudyPortalHeaderComponent,
    StudyPortalFooterComponent
  ],
  providers:[
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class CoreModule {
  constructor(){
    registerLocaleData(fr.default)
  }
}
