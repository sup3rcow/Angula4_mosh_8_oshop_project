import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';


export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        // definiras izgled objekta na firebaseu-nije array nego objekt sa propertijima

        this.itemsMap = itemsMap || {}; // osiguras da itemMap nikada ne bude undefined

        for (let productId in itemsMap) {
            let item = itemsMap[productId]; // uzmes objekt iz firebasea
            let x = new ShoppingCartItem();
            Object.assign(x, item); // pomapirace sve osim $key-a jer on nije property u firebase
            x.$key = productId;
            this.items.push(x); // punis array ts objektima da mozes ngFor
        }
    }

    // dateCreated;


    // get productIds() {
        // let productIds: string[] = [];
        // for (let productId in this.items) {
        //     productIds.push(productId);
        // }
        // return productIds;

        // elegantnije, koristis javascipt funkciju "keys"
        // return Object.keys(this.itemsMap);
    // }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quiantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    getQuantity(product: Product): number {
        let item = this.itemsMap[product.$key];
        return item ? item.quiantity : 0;
      }
}
