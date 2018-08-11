import { Component, OnInit } from '@angular/core';

import { AllTestService } from '../services/all-test.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  testData;
  categories;
  dataLoaded = false;
  isLoggedin;

  constructor(private allTest: AllTestService, private auth: AuthService) {
  }
  ngOnInit() {
    this.allTest.getAllTests()
    .subscribe(
      (data) => (this.testData = data, this.categories = data.category, this.dataLoaded = true),
      (error) => (console.log(error))
    )

    this.isLoggedin = localStorage.getItem('role') === 'student'
    console.log("isloggedin", this.isLoggedin)
  }

}
