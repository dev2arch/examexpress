import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    @ViewChild('modal1') modal1: ElementRef;
    loginData;
    authToken;
    signUpRes;
    usrObj;
    role = localStorage.getItem('role');

  constructor(private login: AuthService, private router: Router) { }

    ngOnInit() {
      this.login.role.subscribe
      (updatedrole => {
        this.role = updatedrole;
        // alert("in sbscription role is >>>" + this.role)
      });
    }
    chkUser(form: NgForm) {
      console.log(form.value);
      const email = form.value.uname;
      const password = form.value.password;
      this.login.signIn(email, password)
      .subscribe(
        (res) => {
          if (res) {
            console.log(res)
            this.closeModal();
          }
        },
        error => console.log(error));
      }
      private closeModal(): void {
      if (this.role === 'admin') {
      this.router.navigate(['admin-area']);
      } else if (this.role === 'student') {
        this.router.navigate(['student-area']);
      }
      console.log(this.closeBtn)
      this.closeBtn.nativeElement.click();
     // this.router.navigateByUrl('home')
    }
    public openModel(): void {
      alert('please login')
      console.log(this.modal1)
      this.modal1.nativeElement.className = 'modal fade show';
    }
    signUp(form: NgForm) {
       this.usrObj = {
            'firstName' : form.value.firstname,
            'lastName' : form.value.lastname,
            'username' : form.value.uname,
            'email' : form.value.email,
           'password' : form.value.password
       }
       this.login.signUpUser(this.usrObj)
       .subscribe(
         (res) => this.signUpRes = res,
         (err) => console.log(err)
       );

     }
}
