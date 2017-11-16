import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.appUser$
      .map(appUser => { // Observable<boolean>
        if (appUser.isAdmin) {
          return true;
        }
        this.router.navigate(['/']); // ili napravis rutu not authorized
        return false;
      });
  }
}
