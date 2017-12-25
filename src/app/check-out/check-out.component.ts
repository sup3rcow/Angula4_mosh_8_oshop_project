import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

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

  constructor(private cartService: ShoppingCartService, private orderService: OrderService, private authService: AuthService) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(x) {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: x,
      items: this.cart.items.map(item => {
        return  {
          product: {
            title: item.title,
            imageUrl: item.imageUrl,
            price: item.price
          },
          quantity: item.quiantity,
          totalPrice: item.totalPrice
        };
      })
    };

    let orderId = await this.orderService.storeOrder(order);
    console.log(orderId.key);
    localStorage.setItem('orderId', orderId.key);
  }

}
