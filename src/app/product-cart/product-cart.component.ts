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

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity(): number {
    if (!this.shoppingCart || !this.shoppingCart.items) {
      return 0;
    }
    let item = this.shoppingCart.items[this.product.$key];
    return item ? item.quiantity : 0;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
