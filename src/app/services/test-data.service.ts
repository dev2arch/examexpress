import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestDataService {

  private subject = new Subject<any>();
  public valuesFromA = this.subject.asObservable();

  constructor() { }

  changeValueFromA(value: any) {
    console.log("value", value)
    this.subject.next(value);
  }

}
