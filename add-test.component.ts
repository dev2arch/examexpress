import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public addTestDetails(testDetails: NgForm) {
    alert("hii")
    console.log(testDetails.value)
  }

}
