import { Component } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { OnDestroy, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []; // moras inicijalizirati ili u kodu proveravati da li je null
  filteredProducts: Product[] = []; // dobra praksa je sve arraye inicijalizirati..
  // subscription: Subscription;

  category: string;

  // cart;
  cart$: Observable<ShoppingCart>;

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


    this.populateProducts();
  }

  async ngOnInit() {
    // nemozes awaitati u konstruktoru pa si onda ovo prebacio u oninit
    // this.subscription = (await this.cartService.getCart()).subscribe(cart => {
    //   this.cart = cart;
    // });

    this.cart$ = await this.cartService.getCart();

    // kako bi bilo finije poslozeno,
    // mozes prebaciti ostatak inicijalizacije iz konstruktora u ngOnInit
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }


    // isto sto i gore u konstruktoru samo malo elegantnije, imas samo jedan subscribe jer koristis switchMap
    // tu se nemoras unsubscribati
    // https://stackoverflow.com/questions/44748878/do-we-have-to-unsubscribe-when-using-switchmap-operator-in-rxjs-in-angular-2
  private populateProducts() {
    this.productService.getAll().switchMap(products => {
      this.filteredProducts = this.products = products;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    if (this.category) {
      this.filteredProducts = this.products.filter(p => p.category === this.category);
    } else {
      this.filteredProducts = this.products;
    }
  }

}
