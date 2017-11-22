import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../models/product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription;

  categories$;


  constructor(private productService: ProductService, private categoriesService: CategoryService) {
    this.categories$ = categoriesService.getAll();

    this.subscription = productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
    });


  }

  changeCategory(category) {
    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
