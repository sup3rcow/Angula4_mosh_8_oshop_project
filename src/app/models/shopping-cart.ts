import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
    constructor(public items: ShoppingCartItem[]) { }

    // dateCreated;

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quiantity;
        }
        return count;
    }
}
