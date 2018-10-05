import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-timer',
  // templateUrl: './timer.component.html',
  template: '<h4>Time Remaining:{{tick}}</h4>',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  public tick: number;
  private subscription: Subscription;
  constructor() { }

  ngOnInit() {
    let timer = TimerObservable.create(2000, 1000);
    this.subscription = timer.subscribe(t => {
      this.tick = 60 - t;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
