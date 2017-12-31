import { AuthGuard } from '../shared/services/auth-guard.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';


@NgModule({
  imports: [
    // CommonModule, // sadrzano je u shared module
    // FormsModule,
    CustomFormsModule,
    SharedModule,
    NgbModule, // tu ne trebas NgbModule.forRoot(), jer tako treba samo u root modulu
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  // exports: [ // ne exportas jer ove komponente koristis samo u admin modulu
  //   AdminProductsComponent,
  //   AdminOrdersComponent,
  //   ProductFormComponent
  // ],
  providers: [AdminAuthGuard]
})
export class AdminModule { }
