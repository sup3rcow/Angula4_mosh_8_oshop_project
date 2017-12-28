import { ShoppingCart } from './shopping-cart';



export class Order {

    datePlaced;
    items: any[];

    constructor(public userId: string, public shipping: any, cart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = cart.items.map(item => {
            return  {
              product: {
                title: item.title,
                imageUrl: item.imageUrl,
                price: item.price
              },
              quantity: item.quiantity,
              totalPrice: item.totalPrice
            };
        });
    }
}
