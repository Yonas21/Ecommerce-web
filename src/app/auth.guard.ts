import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { UserService} from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router) {}

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userService.isLoggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
     }
}
