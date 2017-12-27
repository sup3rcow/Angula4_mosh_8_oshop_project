import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'shoppign-form',
  templateUrl: './shoppign-form.component.html',
  styleUrls: ['./shoppign-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppignFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  userId: string;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(shipping) {
    let order = new Order(this.userId, shipping, this.cart);

    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
