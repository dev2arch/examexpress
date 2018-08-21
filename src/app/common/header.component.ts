import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../services/auth.service';
import { HostListener, Inject } from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @ViewChild('open') open: ElementRef;
  menuObj: any = [];
  role = localStorage.getItem('role');
  loggedIn = false;
  istest ;
  logo ;
  currUrl;
  constructor( private authService: AuthService, private activatedRoutes: ActivatedRoute, private router: Router) {
    this.menuObj = {
       menu:
          [
             {name: 'Home', link: 'home', sub: null},
             {name: 'Exams', link: 'test', sub:
                [
                   {name: 'SBI-PO', link: 'exam/sbipo', sub: null},
                   {name: 'SSC', link: 'exam/ssc', sub: null},
                   {name: 'Gate', link: 'exam/gate', sub: null}
                ]
             },
             {name: 'Blog', link: 'Blog', sub: null},
             // {name: 'Admin', link: 'admin-area', sub: null},

             {name: 'AllCourses', link: 'Blog', sub: null},
             {name: 'Contact-Us', link: 'contact-us', sub: null},
            {name: 'My Profile', link: 'student-area', sub: null},

        ]
    }}

  ngOnInit() {

    this.router.events.subscribe(
      (url: any) => {this.currUrl = url;
        if ( this.currUrl.url === '/home' ) {
          this.logo = '/assets/images/logomob.png'
        } else {
          this.logo = '/assets/images/logo.png'
        }},
    );

  this.activatedRoutes.queryParams
    .subscribe(
      (val) => {this.istest = val}
    )
    this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          this.loggedIn = authenticated
        }
      )

    this.authService.role.subscribe
    (updatedrole => {
      this.role = updatedrole;
    });
  }

  logOut() {
    this.authService.logOut()
    this.loggedIn = false;
  }

  public openModel(): void {
    // console.log( this.open)
    document.getElementById('open').click()
    // this.open.nativeElement.click()
  }

  openMobileMenu(val) {
    var element = document.getElementById("mobileMenu");
    if (val === 'open') {
    element.className += " ed-mm-act";
  } else {
    element.classList.remove("mobileMenu");
  }
}
  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var cols =      document.getElementById('mob-menu')
    if (number > 150) {

      cols.style.cssText  = "background: white; box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.32)";
      this.logo = '/assets/images/logo.png'


    } else if (number < 50) {

      cols.style.cssText  = "background: #ffffff00; box-shadow: none";
      if ( this.currUrl.url === '/home' ) {
        this.logo = '/assets/images/logomob.png'
      }
    }

  }

}
