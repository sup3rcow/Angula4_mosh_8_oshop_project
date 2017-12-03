import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // kako ne bi morao raditi promise then, napravis async
  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    return item$.take(1).subscribe(item => {
      // spremas citav objekt kako bi lakse prikazao podatke, da ne moras kasnije dohvatati po productId ostale propertije
      // napises ovako i puno je preglednije nego ispod if else, set update
      item$.update({ product: product, quiantity: (item.quiantity || 0) + 1 });

      // if (item.$exists()) {
      //   item$.update({ quiantity: item.quiantity + 1 });
      // } else {
      //   item$.set({ product: product, quiantity: 1 });

      // }
    });

    // return this.db.list('/shopping-carts/' + cart.).push({ productId: product.$key});
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
     });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

    // umjesto promisa, pretvoris u async pa ti izgleda lepse, čitljivije
    // this.create().then(result =>  {
    //   localStorage.setItem('cartId', result.key);
    //   cartId = result.key;
    // });
  }


  //////////////////
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  ////
  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    item$.take(1).subscribe(item => {
      if (item && item.quiantity > 0) {
        item$.update({ quiantity: item.quiantity - 1 });
      }
    });
  }

}
