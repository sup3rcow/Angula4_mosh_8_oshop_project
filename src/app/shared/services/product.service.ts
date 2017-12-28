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

  update(productid, product) {
    // firebase update objekt moze sadrzati samo propertije koji se meju update-ati
    // u product objektu smijemo imati propertije koji se meju update-ati, a to nije productid zato ga posebno saljemo kao parametar
    return this.db.object('/products/' + productid).update(product);
  }

  delete(productid) {
    return this.db.object('/products/' + productid).remove();
  }

}
