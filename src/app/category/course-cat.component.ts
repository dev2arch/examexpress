import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AllTestService } from '../services/all-test.service';

@Component({
  selector: 'app-course-cat',
  templateUrl: './course-cat.component.html',
  styleUrls: ['./course-cat.component.css']
})
export class CourseCatComponent implements OnInit {

category: string;
testsData: any;

  constructor(private route: ActivatedRoute, private tests: AllTestService) { }

  ngOnInit() {
    // window.scrollTo(0, 0);
    this.category = this.route.snapshot.params['cat'];
    this.tests.getAllTestsByCat(this.category)
    .subscribe(
      (data) => (this.testsData = data, console.log('cat data', data)),
      (error) => (console.log(error))
    )

  }

}
