import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AllTestService } from '../services/all-test.service';
import {TestDataService} from "../services/test-data.service";

@Component({
  selector: 'app-course-cat',
  templateUrl: './course-cat.component.html'
})
export class CourseCatComponent implements OnInit {

category: string;
testsData: any;
subcat:any;
queryParam:any;

  constructor(private route: ActivatedRoute, private tests: AllTestService,
              // private dataService: TestDataService
  ) {
    this.subcat = [];

  }

  ngOnInit() {
    // window.scrollTo(0, 0);
    this.category = this.route.snapshot.params['cat'];
    this.tests.getAllTestsByCat(this.category)
    .subscribe(
      (data) => (this.testsData = data, this.getAllSubCat(this.testsData)),
      (error) => (console.log(error))
    )
  }

  private getAllSubCat(testData) {
    console.log(testData)
    this.queryParam = JSON.stringify(testData)
    // this.dataService.changeValueFromA(testData)
    for (var i in testData) {
      if (this.subcat.indexOf(testData[i].subCategory) < 0) {
        this.subcat.push(testData[i].subCategory)
      }
    }

  }

}
