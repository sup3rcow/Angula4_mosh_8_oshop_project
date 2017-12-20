import { Product } from './product';


export class ShoppingCartItem {
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quiantity: number;

    // constructor(public product: Product, public quiantity: number) { }
    constructor(item?: Partial<ShoppingCartItem>) { // init moze liciti na Shopping cart
        Object.assign(this, item); // pomapiras ulazni parametar na propertije od objekta
    }

    get totalPrice() {
        return this.price * this.quiantity;
    }
}
