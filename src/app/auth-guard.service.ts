import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    // Sa "map" mapiras observable of user$ na observable of boolean
    // Pogledaj u prvim vjezbama.. kad se koristi jwt, tamo u primjeru
    // se vraca boolean iz servisa a ne observable of boolean
    return this.auth.user$.map(user => {
              if (user) {
                return true;
              }
              this.router.navigate(['/login'],
              {
                queryParams: {
                  returnUrl: state.url
                }
              });
              return false;
            });
  }

}
