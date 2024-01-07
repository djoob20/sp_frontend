import {Component, OnDestroy, OnInit} from '@angular/core';
import {HelperService} from "../../services/helper.services";

@Component({
  selector: 'app-server-down',
  templateUrl: './server-down.component.html',
  styleUrls: ['./server-down.component.scss']
})
export class ServerDownComponent implements OnInit, OnDestroy{

  constructor(private helperService: HelperService) {

  }
  ngOnDestroy(): void {
    this.helperService.isServerAvailable$.next(true);
  }

  ngOnInit(): void {
    this.helperService.isServerAvailable$.next(false)
  }


}
