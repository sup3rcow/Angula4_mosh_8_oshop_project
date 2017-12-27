import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shoppign-cart-summary',
  templateUrl: './shoppign-cart-summary.component.html',
  styleUrls: ['./shoppign-cart-summary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppignCartSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;

  constructor() { }

  ngOnInit() {
  }

}
