import { Component, OnInit } from '@angular/core';
import {NgForm,FormArray, FormControl, FormGroup} from '@angular/forms';
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
  optionType: string;
  noOfQuestion: number;
  numbers: any;
  includeImage: false;

  optionTypes = ['text', 'image'];
  signUpForm: FormGroup;

  constructor(private testService:  AllTestService) {
    this.optionType = 'text';
    this.noOfQuestion = 1;
    this.numbers = Array(this.noOfQuestion).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    this.detaileSubmitted = false;
    this.signUpForm = new FormGroup({
      'questions': new FormArray([])
    });
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
      id: testDetails.value.testCode,
      testDurationInMinutes: testDetails.value.testDuration,
      type: testDetails.value.testType
    }

    console.log(testDetailsObj)
    this.testService.addTestDetails(testDetailsObj).subscribe(
      (res) => this.response = res,
      (err) => console.log(err),
      () => this.testAdded()
    )
    this.detaileSubmitted = true

  }
    public testAdded() {
    alert("Test Details Added Successfully......")
      document.getElementById("testdesc").classList.remove("active");
      document.getElementById("testdesc").classList.add("fade");
      document.getElementById("questions").classList.add("active");
      document.getElementById("questions").classList.remove("fade");

    }

   fileChangetemp(event) {
    this.testService.addQuestionstemp(event, this.testCode)
      .subscribe(
        (res) => this.quesRes = res,
        (err) => console.log("tserror>>", err)
      )
  }

  addQuestions(form: NgForm) {
    console.log(form.value)
  }
  formSubmitted() {
    console.log(this.signUpForm.value.questions);
  }
  onAddHobby() {
    const Questions = new FormGroup({
      'question': new FormControl(null),
      'includeImage': new FormControl(false),
      'optiontype': new FormControl('text'),
      'options': new FormGroup({
        'option1': new FormControl(null),
        'option1is': new FormControl(false),
        'option2': new FormControl(null),
        'option2is': new FormControl(false),
        'option3': new FormControl(null),
        'option3is': new FormControl(false),
        'option4': new FormControl(null),
        'option4is': new FormControl(false),
      })
    });
    (<FormArray>this.signUpForm.get('questions')).push(Questions)

  }

}
