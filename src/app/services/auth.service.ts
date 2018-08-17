  import {Injectable, OnInit} from '@angular/core';
  import{ Http, Response, Headers } from '@angular/http';
  import {error} from 'util';
  import {Observable} from 'rxjs/Observable';
  import {BehaviorSubject} from 'rxjs/BehaviorSubject';
  // import { Observable } from 'rxjs';
  import 'rxjs/add/operator/map'
  import {Router} from '@angular/router';
  import {AppConfig} from '../app.config';

   @Injectable()
  export class AuthService implements OnInit {
    public token: string;
    data;
    loggedIn = false;
    role = new BehaviorSubject(localStorage.getItem('role'));
    ngOnInit() {
      }

    logOut() {
        localStorage.clear()
        this.setRole()
        this.router.navigate(['home'])
      }

      constructor(private http: Http, private router: Router) { }

      public signIn(email, password) {
      localStorage.clear()
      var dataToPost = {
        'username' : email,
        'password' : password
      }
      console.log(dataToPost)
        var url = AppConfig.API_ENDPOINT + '/login';
        var headers = new Headers();
            headers.append('Content-Type', 'application/json');
        return this.http.post(url, (dataToPost), {headers: headers})
        .map(
            (response: Response) => { this.data = response, this.data.token = response.headers.get('Authorization')
            if (response.headers.get('Authorization')) {
            this.token = response.headers.get('Authorization');
              if (email === 'admin') {

                this.data.role = 'admin'

               // alert('from local' + currRole)
              } else {
                this.data.role = 'student'
              }
              var currRole = localStorage.setItem('role', this.data.role)
              localStorage.setItem('currentUser', JSON.stringify({ role: this.data.role, username: email, token: this.token }));
              this.setRole();
              // this.setRole()
              this.loggedIn = true;
              return this.data;
            } else {
              this.data.error = "authentication failed"
              console.log("auth failed")
              return this.data;
            }
          }
          ,
        )
        }

        public signUpUser(usrObj) {
          var url = AppConfig.API_ENDPOINT + '/users/register'
          var dataToPost = usrObj;
          var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            console.log(usrObj)
            return this.http.post(url, (dataToPost), {headers: headers})
            .map(
              (response: Response) => { this.data = response; console.log(response)},
              error => console.log(error)
            )
        }

        public  isAuthenticated() {
         // var loggedin;
          this.loggedIn
          if (localStorage.getItem('role')) {
            this.loggedIn = true
            console.log(this.loggedIn)
          } else {
            this.loggedIn = false
            console.log(this.loggedIn)
          }
          const promise = new Promise(
            (resolve, reject) => {
             setTimeout( () => resolve(this.loggedIn))
            }
          );
          return promise;
          }
      setRole() {
      var currRole = localStorage.getItem("role")
     // alert("Role is set to " + currRole)
      this.role.next(currRole);
    }
    }
