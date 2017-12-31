import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppignCartSummaryComponent } from './components/shoppign-cart-summary/shoppign-cart-summary.component';
import { ShoppignFormComponent } from './components/shoppign-form/shoppign-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
    // CommonModule, // sadrzano je u shared module
    // FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductsComponent,
    ProductFilterComponent,
    ShoppignCartSummaryComponent,
    ShoppignFormComponent,
    ShoppingCartComponent
  ]
  // ,exports: [ // ne exportas jer ove komponente koristis samo u shopping modulu
  //   CheckOutComponent,
  //   OrderSuccessComponent,
  //   MyOrdersComponent,
  //   ProductsComponent,
  //   ProductFilterComponent,
  //   ShoppignCartSummaryComponent,
  //   ShoppignFormComponent
  // ]
})
export class ShoppingModule { }
