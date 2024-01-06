import { Component, OnInit } from '@angular/core';
import {HelperService} from "../../../core/services/helper.services";

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.scss']
})
export class AddNewCourseComponent implements OnInit{


  constructor(private helperService: HelperService) {
  }

  ngOnInit(): void {
    this.helperService.setSecondaryFooterStyle(true);
  }

  onAddCourse():void{

  }
}

