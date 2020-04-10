import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const rurl = state.url.split("/")
    const requestedUser:string = rurl[rurl.length -1]
    debugger;
    if (!(this.auth.loggedIn() && (this.auth.verifyUserAccess(requestedUser))) ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
