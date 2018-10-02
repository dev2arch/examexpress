import { Component, OnInit } from '@angular/core';
import {NgForm,FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { AllTestService} from "../services/all-test.service";
import {stringifyElement} from "@angular/platform-browser/testing/browser_util";
import {UploadQuestionImageService} from "../services/upload-question-image.service";

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
  selectedFiles: FileList;

  optionTypes = ['text', 'image'];
  signUpForm: FormGroup;

  constructor(private testService:  AllTestService, private uploadService: UploadQuestionImageService) {
    this.optionType = 'text';
    this.noOfQuestion = 2;
    this.numbers = Array(this.noOfQuestion).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    this.detaileSubmitted = false;
    this.signUpForm = new FormGroup({
      'questions': new FormArray([
      ])
    });

    for (var i = 0; i < this.noOfQuestion; i++){
      this.onAddHobby();
    }

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
    //console.log(this.signUpForm.value.questions);
    let arr = this.signUpForm.value.questions;
    arr.forEach(this.setImagePath)
     console.log(arr)
    this.testService.addqArray(arr, this.testCode)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      )
  }
  setImagePath(item, index) {
    console.log(item.questionImage)
    if(item.questionImage !== null) {
      item.questionImage = item.questionImage.replace(/^.*\\/, "");
    }
     //console.log(item.options)
      item.options.forEach(function (options) {
        if (options.optionImage !== null) {
          console.log(item.optionImage)
          options.optionImage = options.optionImage.replace(/^.*\\/, "");
        }
      })
  }

  onAddHobby() {
      const Questions = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'includeImage': new FormControl(false),
      'questionImage': new FormControl(null),
      'optionType': new FormControl('text'),
      'timeLimit': new FormControl(60),
      'isActive': new FormControl(true),
      'marks': new FormControl(5),
        "questionType":  new FormGroup({
          'questionTypeCode': new FormControl('MCQ'),
          'name': new FormControl('Multiple Choice Questions'),
        }),
      'solution': new FormControl(null),
      'solutionImg': new FormControl(null),
      'options': new FormArray([
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'isAnswer': new FormControl(false),
          'optionImage': new FormControl(null),
        }),
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'isAnswer': new FormControl(false),
          'optionImage': new FormControl(null),
        }),
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'isAnswer': new FormControl(false),
          'optionImage': new FormControl(null),
        }),
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'isAnswer': new FormControl(false),
          'optionImage': new FormControl(null),
        })
        ])
    });
    (<FormArray>this.signUpForm.get('questions')).push(Questions);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadfile(file, this.testCode);
    alert(this.selectedFiles)
  }

}
