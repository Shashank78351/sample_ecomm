import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from './pages/sale/sale.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
 
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path: 'products',component: ProductListComponent}, 
  {path: 'sale',component: SaleComponent},
  {path:'confirmOrder',component:ConfirmOrderComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'orders', component:UserOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
