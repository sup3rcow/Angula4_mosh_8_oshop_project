import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../shared/models/app-user';
import { UserService } from '../shared/services/user.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';



@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BsNavbarComponent implements OnInit {

  isCollapsed = true;

  appUser: AppUser;

  totalCount: number;

  cart$: Observable<ShoppingCart>;

  // ako authService koristis u html-u - templejtu, zbog bildanja za produkciju, ahead of time compiler ocekuje
  // da takvi fieldovi-properiji budu PUBLIC, npr koristio si ga:
  // authService.user$ | async as user; else anonymusUser
  // ali posto ne koristis async pipe zbog problema sa switchMap, authService moze biti private
  constructor(private authService: AuthService, private cartService: ShoppingCartService) {
    // jer se async pipe misli da se stalno dogadja promjena kad se koristi switchMap
    // ovako se subscribas na appUser$, ne moras se unsubscribate je ova komponenta stalno zivi

    // -----DOBRA PRAKSA JE AKO IMAS ONINIT DA PREBACIS SVE IZ KONSTRUKTORA U ONINIT
   }

   async ngOnInit() {
     this.authService.appUser$.subscribe(appUser => this.appUser = appUser);

     this.cart$ = await this.cartService.getCart();

    //  (await this.cartService.getCart()).subscribe(cart => {
    //   this.totalCount = 0;
    //   if (cart && cart.items) {
    //     for (let productId in cart.items) {
    //       this.totalCount += cart.items[productId].quiantity;
    //     }
    //   }
    // });

   }

  logout() {
    this.authService.logout();
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
