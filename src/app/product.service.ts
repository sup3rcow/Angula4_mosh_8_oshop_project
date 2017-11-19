import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product); // push vraca promise, zato ga returnamo onom ko pozove zervis
  }

  getAll() {
    return this.db.list('/products');
  }

  get(productId: string) {
    return this.db.object('/products/' + productId);
  }

}
