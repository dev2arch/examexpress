import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  role = localStorage.getItem('role');
  isTest: any;
  constructor(public authService: AuthService, private activatedRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.authService.role.subscribe
    (updatedrole => {
      this.role = updatedrole;
      // alert("in sbscription role is >>>" + this.role)
    });
    this.activatedRoutes.queryParams
      .subscribe(
        (val) => {this.isTest = val}
      )
  }

}
