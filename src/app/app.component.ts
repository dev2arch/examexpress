import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit ,  OnDestroy {


  constructor (private router: Router, private authService: AuthService) {  }
  ngOnInit() {
    this.router.events.subscribe(
      (evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return
        } else {
          window.scrollTo(0, 0)
        }
      }
    )
  }

  ngOnDestroy() {
    this.authService.logOut()
  }
}
