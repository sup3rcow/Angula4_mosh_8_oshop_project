import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCartComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions: boolean = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

}
