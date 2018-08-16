import { Component, OnInit } from '@angular/core';
import { AllTestService} from '../services/all-test.service';

@Component({
  selector: 'app-all-test',
  templateUrl: './all-test.component.html',
  styleUrls: ['./all-test.component.css']
})
export class AllTestComponent implements OnInit {
  allTests;

  constructor(private testService: AllTestService) { }

  ngOnInit() {
    this.testService.getAllTests().subscribe(
      (data) => (this.allTests = data, console.log(data)),
      (err) => console.log("error in getting all tests", err)
    )
  }

}
