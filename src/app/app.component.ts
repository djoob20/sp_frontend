import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {HelperService} from "./core/services/helper.services";
import {concatMap} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'studyportal';

  showHeaderAndHeader!: boolean;

  constructor(private helperService: HelperService,
              private cdRef: ChangeDetectorRef) {


    this.helperService.isPageAvailable$.pipe(
      concatMap(async (value) => this.showHeaderAndHeader = value)
    ).subscribe();

    this.helperService.isServerAvailable$.pipe(
      concatMap(async (value) => this.showHeaderAndHeader = value)
    ).subscribe();


  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
