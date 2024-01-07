import {Component, OnDestroy, OnInit} from '@angular/core';
import {HelperService} from "../../services/helper.services";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent implements OnInit, OnDestroy{
  constructor(private helperService: HelperService) {
  }

  ngOnDestroy(): void {
    this.helperService.isPageAvailable$.next(true);
    console.log("isPageAvailable$: " + this.helperService.isPageAvailable$.value)
  }

  ngOnInit(): void {
    this.helperService.isPageAvailable$.next(false);
    console.log("isPageAvailable$: " + this.helperService.isPageAvailable$.value)
  }
}
