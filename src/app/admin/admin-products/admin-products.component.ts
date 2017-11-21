import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // https://ng-bootstrap.github.io/#/components/pagination/api
  pageSize = 4;
  page = 1;

  // products$;
  products: Product[]; // nije vise observable jer lokalno filtriras products
  filteredProducts: Product[];
  displayProducts: Product[];

  subscription: Subscription;



  constructor(private productService: ProductService) {
    // this.products$ = productService.getAll(); // u html-u vise ne pristupas preko | async

    // Unsubscribe radis u OnDestroy metodi
    // ako korisnik ima otvorena 2 taba, u jednom uredjuje products a ovde gleda koje sve ima
    // popis ce mu se osvjezavati automatski, ako npr kreira novi product
    this.subscription = productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;

      this.displayedItems();
    });

  }

  // posto ne radis sa puno podataka.. reda velicine 500 zapisa u tablici
  // filtriranje radis na klijentu nakon sto povuces sve podatke sa servera
  filteredItems(query: string) {
    this.filteredProducts = (query) ?
    this.products.filter(x => x.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;

    this.displayedItems();
  }

  displayedItems() {
    this.displayProducts = this.filteredProducts.slice(this.pageSize * (this.page - 1), this.pageSize * this.page);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

/** neki lik je sa novom verzijom firebase ima problem mapirati objekt na nas inteface, ovako je rijesio? nadji bolje resenje akd ti zatreba
 *
 * this.subscription = this.productService.getProductsFromDB()
    .subscribe( products  => {
      products.forEach( value => {
            this.products.push(
              { title : value.payload.val().title,
               price : value.payload.val().price,
               imageUrl : value.payload.val().imageUrl,
               category : value.payload.val().category } );
      });
      this.filteredProducts = this.products;
 */
