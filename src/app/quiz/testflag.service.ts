import { Injectable } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Injectable()
export class TestflagService implements OnDestroy {

  testStarted = false;


  constructor() { }



  testStatus(stat) {
    this.testStarted = stat;
    return this.testStarted;
  }

  ngOnDestroy() {
    this.testStarted = false;
  }

}
