import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HelperService} from "../../../services/helper.services";

@Component({
  selector: 'app-study-portal-footer',
  templateUrl: './study-portal-footer.component.html',
  styleUrls: ['./study-portal-footer.component.scss']
})
export class StudyPortalFooterComponent implements AfterViewInit {


  constructor(private helperService: HelperService) {
  }

  ngAfterViewInit(): void {
    const footer = document.getElementById('footer-container');
    this.helperService.isSecondaryFooterStyle$.subscribe(value => {
      // @ts-ignore
      if (value) {
        // @ts-ignore
        footer.classList.add('footer-secondary-position');
        // @ts-ignore
        footer.classList.remove('footer-primary-position')
      } else {
        // @ts-ignore
        footer.classList.remove('footer-secondary-position');
        // @ts-ignore
        footer.classList.add('footer-primary-position')
      }
    })
  }
}
