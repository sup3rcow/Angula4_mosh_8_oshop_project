import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

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


  //////////////////
  async getCart(): Promise<FirebaseObjectObservable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  // async getCart(): Promise<Observable<ShoppingCart>> {
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId)
  //   .map(x => new ShoppingCart(x.items)); // mapiras firebase objekt na ts objekt kako bi dobio funkcionalnost propertija totalcount
  // }     // mapiras firebase objekt na ts objekt kako bi dobio funkcionalnost propertija totalcount


  // add i remove vracaju promise, ne moramo awaitati jer nas ne zanima rezultat.. samo okidamo update
  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }


  // kako ne bi morao raditi promise then, napravis async
  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    return item$.take(1).subscribe(item => {
      // spremas citav objekt kako bi lakse prikazao podatke, da ne moras kasnije dohvatati po productId ostale propertije
      // napises ovako i puno je preglednije nego ispod if else, set update
      item$.update({ product: product, quiantity: (item.quiantity || 0) + change });

      // if (item.$exists()) {
      //   item$.update({ quiantity: item.quiantity + 1 });
      // } else {
      //   item$.set({ product: product, quiantity: 1 });

      // }
    });

    // return this.db.list('/shopping-carts/' + cart.).push({ productId: product.$key});
  }

}
