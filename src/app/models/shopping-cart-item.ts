import { Product } from './product';


export class ShoppingCartItem {

    constructor(public product: Product, public quiantity: number) { }

    get totalPrice() {
        return this.product.price * this.quiantity;
    }
}
