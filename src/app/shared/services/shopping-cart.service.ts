import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // add i remove vracaju promise, ne moramo awaitati jer nas ne zanima rezultat.. samo okidamo update
  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  //////////////////
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(cart => new ShoppingCart(cart.items));
    // mapiras kako bi imao pristup custom properiju ShoppingCart objekta
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
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

    // ove 4 linije koda su glupo rjesenje za popravak stete.. bolje napravi da bude thread safe metoda..
    // jer ovu metodu u isto vreme pozovu navbar i roducts komponente.. pa pravi put se kreira 2 shopping-cart-a
    cartId = localStorage.getItem('cartId');
    if (cartId) {
      this.db.list('/shopping-carts').remove(result.key);
      return cartId;
    }

    localStorage.setItem('cartId', result.key);
    return result.key;

    // umjesto promisa, pretvoris u async pa ti izgleda lepse, čitljivije
    // this.create().then(result =>  {
    //   localStorage.setItem('cartId', result.key);
    //   return result.key;
    // });
  }




  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId)
  //   .map(x => new ShoppingCart(x.items)); // mapiras firebase objekt na ts objekt kako bi dobio funkcionalnost propertija totalcount
  // }     // mapiras firebase objekt na ts objekt kako bi dobio funkcionalnost propertija totalcount





  // kako ne bi morao raditi promise then, napravis async
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    return item$.take(1).subscribe(item => {
      let quantity = (item.quiantity || 0) + change;
      if (quantity === 0) {
        item$.remove(); // remove moras pozvati nad observableom
      } else {
      // spremas citav objekt kako bi lakse prikazao podatke, da ne moras kasnije dohvatati po productId ostale propertije
      // napises ovako i puno je preglednije nego ispod if else, set update
      item$.update({
        // product: product,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quiantity: quantity
      });

      // if (item.$exists()) {
      //   item$.update({ quiantity: item.quiantity + 1 });
      // } else {
      //   item$.set({ product: product, quiantity: 1 });

      // }
      }


    });

    // return this.db.list('/shopping-carts/' + cart.).push({ productId: product.$key});
  }

}
