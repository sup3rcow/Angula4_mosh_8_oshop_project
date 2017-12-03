import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnDestroy, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy, OnInit {

  products: Product[] = []; // moras inicijalizirati ili u kodu proveravati da li je null
  filteredProducts: Product[] = []; // dobra praksa je sve arraye inicijalizirati..
  subscription: Subscription;

  category: string;

  cart;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService) {

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
    productService.getAll().switchMap(products => {
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

  async ngOnInit() {
    // nemozes awaitati u konstruktoru pa si onda ovo prebacio u oninit
    this.subscription = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
