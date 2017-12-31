import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    // CommonModule, // sadrzano je u shared module
    // FormsModule,
    SharedModule,
    RouterModule.forChild([]),
    NgbModule // samo u app module ide for root
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ],
  exports: [
    BsNavbarComponent // jer se koristi u app.compomonent
  ]
})
export class CoreModule { }
