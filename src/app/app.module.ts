import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    // FormsModule, // sadrzan je u shared module
    AngularFireModule.initializeApp(environment.firebase),

    // mosh je i ova 3 prebacio u shared module i exportao ih..
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(), // samo u app module ide for root

    RouterModule.forRoot([
      { path: '', component: ProductsComponent }, // nisi preselio u core.module jer se koristi ProductsComponent iz shopping modula
      { path: 'login', component: LoginComponent },

      // { path: 'products', component: ProductsComponent },
      // { path: 'shopping-cart', component: ShoppingCartComponent },


      // { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      // { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      // { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

      // { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      // { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      // { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      // { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },

      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
