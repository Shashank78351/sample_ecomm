import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/product-list/product.model';
import { ProductService } from 'src/app/services/product.service';


 
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  products:Product[]=[];
  cartItems: Product[] = [];
  totalItems:Number=0;
  totalPrice:Number=0;

  constructor(private productService:ProductService, private router:Router) { }
 
  ngOnInit(){
    this.productService.cartItems$.subscribe((cartItems)=>{
      this.cartItems=cartItems;
      this.calculateTotals();
    },
    (error)=>{
      console.error('error fetching cart items:', error);
    }
  );
  this.productService.fetchCartItems();
  }
  
  calculateTotals():void {
    this.totalItems=this.cartItems.length;
    this.totalPrice=this.cartItems.reduce((acc,item)=>acc + (item.quantity * item.price), 0);
  }
  removeFromCart(cartId: number): void {
    this.productService.removeFromCart(cartId).subscribe(
      (response) => {
        console.log('Item removed from cart:', response);
        this.cartItems = this.cartItems.filter(item => item.cartId !== cartId);
        this.calculateTotals();
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }
  proceedToConfirmOrder():void{
    this.router.navigate(['/confirm-order']);
  }
 
}