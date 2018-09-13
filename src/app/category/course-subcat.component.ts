import { Component, OnInit, Input } from '@angular/core';
import {TestDataService} from "../services/test-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-subcat',
  templateUrl: './course-subcat.component.html'
})
export class CourseSubcatComponent implements OnInit {
  allTests:any;
  filteredTests:any;
  subCategory:string;

  constructor(private dataService: TestDataService, private route: ActivatedRoute) {
    this.subCategory = this.route.snapshot.params['subcat']
    this.filteredTests = [];
  }

  ngOnInit() {
    console.log("hiii", this.allTests)
    this.route.queryParams.subscribe(
      data => {this.allTests = data, this.getTestsbyCategory(this.allTests)}
    )

  }
  getTestsbyCategory(allTests){
    var allTest = JSON.parse(allTests.mode)
    for (var i in allTest) {
      if (allTest[i].subCategory === this.subCategory) {
        this.filteredTests.push(allTest[i])
      }
    }
    console.log(this.filteredTests)
  }


}
