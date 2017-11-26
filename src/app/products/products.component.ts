import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {

  products: Product[] = []; // moras inicijalizirati ili u kodu proveravati da li je null
  filteredProducts: Product[] = []; // dobra praksa je sve arraye inicijalizirati..
  subscription;

  category: string;


  constructor(private productService: ProductService, private route: ActivatedRoute) {

    // this.subscription = productService.getAll().subscribe(products => {
    //   this.filteredProducts = this.products = products;

    //   route.queryParamMap.subscribe(params => {
    //     this.category = params.get('category');
    //     if (this.category) {
    //       this.filteredProducts = this.products.filter(p => p.category === this.category);
    //     } else {
    //       this.filteredProducts = this.products;
    //     }
    //   });
    // });

    // isto sto i gore samo malo elegantnije, imas samo jedan subscribe jer koristis switchMap
      this.subscription = productService.getAll().switchMap(products => {
        this.filteredProducts = this.products = products;
        return route.queryParamMap;
      }).subscribe(params => {
        this.category = params.get('category');
        if (this.category) {
          this.filteredProducts = this.products.filter(p => p.category === this.category);
        } else {
          this.filteredProducts = this.products;
        }
      });




  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
