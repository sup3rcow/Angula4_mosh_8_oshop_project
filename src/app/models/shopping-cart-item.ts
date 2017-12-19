import { Product } from './product';


export class ShoppingCartItem {
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quiantity: number;

    // constructor(public product: Product, public quiantity: number) { }
    constructor() { }

    get totalPrice() {
        return this.price * this.quiantity;
    }
}
