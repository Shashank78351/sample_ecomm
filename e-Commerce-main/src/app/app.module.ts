import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaleComponent } from './pages/sale/sale.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    SaleComponent,
    ProductListComponent,
    ConfirmOrderComponent,
    SignupComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

