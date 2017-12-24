import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  cart: ShoppingCart;

  constructor(private cartService: ShoppingCartService, private orderService: OrderService) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async placeOrder(x) {
    let order = {
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

    // let orderId = await this.orderService.storeOrder(order);
    console.log(orderId.key);
    // localStorage.setItem('orderId', orderId);
  }

}
