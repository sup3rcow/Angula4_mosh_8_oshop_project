import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app-user';
import { UserService } from '../user.service';



@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BsNavbarComponent {

  isCollapsed = true;

  appUser: AppUser;

  // ako authService koristis u html-u - templejtu, zbog bildanja za produkciju, ahead of time compiler ocekuje
  // da takvi fieldovi-properiji budu PUBLIC, npr koristio si ga:
  // authService.user$ | async as user; else anonymusUser
  // ali posto ne koristis async pipe zbog problema sa switchMap, authService moze biti private
  constructor(private authService: AuthService) {
    // jer se async pipe misli da se stalno dogadja promjena kad se koristi switchMap
    // ovako se subscribas na appUser$, ne moras se unsubscribate je ova komponenta stalno zivi
    authService.appUser$.subscribe(appUser => this.appUser = appUser);
   }

  logout() {
    this.authService.logout();
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
