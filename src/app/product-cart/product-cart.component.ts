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
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  getQuantity(): number {
    if (!this.shoppingCart) {
      return 0;
    }

    let item = this.shoppingCart.items[this.product.$key];
    return item ? item.quiantity : 0;
  }

  removeFromCart(product) {
    this.cartService.removeFromCart(product);
  }

}
