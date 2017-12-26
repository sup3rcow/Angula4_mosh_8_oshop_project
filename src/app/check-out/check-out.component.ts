import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cartSubscription: Subscription;
  userSubscription: Subscription;
  cart: ShoppingCart;
  userId: string;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(shipping) {
    let order = new Order(this.userId, shipping, this.cart);


    let result = await this.orderService.storeOrder(order);
    // console.log(result.key);
    // localStorage.setItem('orderId', result.key);
    this.router.navigate(['/order-success', result.key]);
  }

}
