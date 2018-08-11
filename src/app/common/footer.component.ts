import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  role = localStorage.getItem('role');
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.role.subscribe
    (updatedrole => {
      this.role = updatedrole;
      // alert("in sbscription role is >>>" + this.role)
    });
  }

}
