import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {

  categories$;

  product = {
    title: '',
    price: '',
    category: '',
    imageUrl: ''
  }; // postavis u prazan objekt, jer ce javljati gresku null reference exception
  // postavio si i prazne propertije jer kompjaler head of time javlja greske da ne moze naci propertije
  // ako samo stavis prazan objekt {} bez propertija

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // kada koristis take operator, tad se observable odmah nakon dohvacanja unsubscriba
      // pa ne moras koristiti async pipe ili OnDestroy
      this.productService.get(id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product) {
    this.productService.create(product);
    // console.log(product);
    this.router.navigate(['/admin/products']);
  }
}
