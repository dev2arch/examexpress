import {ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from './services/auth.service';
import {HeaderComponent} from './common/header.component';
import {LoginComponent} from './login/login.component';





@Injectable()
export class AuthGuardS implements CanActivate {
  login;
  auth;
  param
  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
              return this.authService.isAuthenticated()
                .then(
                  (authenticated: boolean) => {
                    if (authenticated) {
                      return true;
                    } else {

                      this.router.navigate(['contact-us'])
                      let clinstance = new HeaderComponent(this.login, this.auth, this.param)
                      clinstance.openModel()
                    }
                  }
                )
  }
}

