import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AllTestService} from "../services/all-test.service";
import {stringifyElement} from "@angular/platform-browser/testing/browser_util";

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  detaileSubmitted;
  formLength = 0;
  response;
  testCode;
  quesRes;
  constructor(private testService:  AllTestService) { }

  ngOnInit() {
    this.detaileSubmitted = false
  }

  public addTestDetails(testDetails: NgForm) {
    this.testCode = testDetails.value.testCode;
    console.log(testDetails.value)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0!
    var yyyy = today.getFullYear();

    if ( dd < 10 ) {
      var temp1 = String(dd)
      temp1 = '0' + dd
      dd = Number(temp1)
    }

    if ( mm < 10 ) {
      var temp2 = String(mm)
      temp2 = '0' + mm
      mm = Number (temp2)
    }

    var tempDate = mm + '/' + dd + '/' + yyyy;
    var currDate = Date.parse(tempDate)
    var startDate = Date.parse(testDetails.value.testStartDate)
    var endDate = Date.parse(testDetails.value.testEndDate)
    var active = false;
    this.formLength = testDetails.value.testtotalQuestions
    if (currDate >= startDate && currDate <= endDate) {
      active = true
    }
    var testDetailsObj = {
      active: active,
      category: testDetails.value.testCategory,
      description: testDetails.value.testDesc,
      endDate: testDetails.value.testEndDate,
      name: testDetails.value.testName,
      noOfQuestions: testDetails.value.testtotalQuestions,
      questions: [],
      startDate: testDetails.value.testStartDate,
      subCategory: testDetails.value.testSubcategory,
      subject: testDetails.value.testSubject,
      testCode: testDetails.value.testCode,
      testDurationInMinutes: testDetails.value.testDuration,
      type: testDetails.value.testType
    }

    console.log(testDetailsObj)
    this.testService.addTestDetails(testDetailsObj).subscribe(
      (res) => this.response = res,
      (err) => console.log(err)
    )
    this.detaileSubmitted = true

  }
   fileChangetemp(event) {
     this.testCode = 'AIPMT005'
    this.testService.addQuestionstemp(event, this.testCode)
      .subscribe(
        (res) => this.quesRes = res,
        (err) => console.log(err)
      )
  }
  fileChange(text) {
    text = JSON.parse(text)
    this.testCode = 'AIPMT005'
    alert("caleed")
     console.log(text)
    // let fileList: FileList = event.target.files;
    // console.log(fileList[0])
    this.testService.addQuestions(text, this.testCode)
      .subscribe(
        (res) => this.quesRes = res,
        (err) => console.log(err)
      )
  }
  openFile(event) {
    var text;
    let input = event.target;
    for (var index = 0; index < input.files.length; index++) {
      let reader = new FileReader();
      (reader.readAsText(input.files[index]));
      reader.onload = () => {
        // this 'text' is the content of the file
        text = reader.result;
        console.log(JSON.parse(text))
        this.fileChange(text)
      }


    }
  }
  public addTestQuestions(testQuestions: NgForm) {
    this.testCode = 'AIPMT005'
    this.testService.addQuestions(testQuestions, this.testCode).subscribe(
      (res) => this.quesRes = res,
      (err) => console.log(err)
    )
  }

}
