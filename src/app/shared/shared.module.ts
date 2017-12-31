import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ProductCartComponent,
    ProductQuantityComponent
  ],
  exports: [ // moras dodati export kako bi ih mogao korisiti parrent module, koji ce koristiti shared module
    ProductCartComponent,
    ProductQuantityComponent,
    // exportas module koje ce druge komponente koristiti
    CommonModule, // npr tu spada ngIf
    FormsModule
  ],
  providers: [AuthService, UserService, AuthGuard, CategoryService, ProductService, ShoppingCartService, OrderService]
})
export class SharedModule { }
