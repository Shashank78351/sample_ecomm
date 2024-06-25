import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { SaleComponent } from './pages/sale/sale.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  }, 
  
  {
    path: 'sale',
    component: SaleComponent
  },
  { path:'confirm-order',component:ConfirmOrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
