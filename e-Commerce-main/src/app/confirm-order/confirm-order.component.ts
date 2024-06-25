import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product-list/product.model';
import { Router } from '@angular/router';

 
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  cartItems: Product[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
 
  constructor(private productService: ProductService, private router:Router) { }
 
  ngOnInit(): void {
    this.productService.cartItems$.subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        this.calculateTotals();
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
    this.productService.fetchCartItems(); // Initial load of cart items
  }
 
  calculateTotals(): void {
    this.totalItems = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  }
 
  confirmOrder(): void {
    this.productService.confirmOrder().subscribe(
      (response) => {
        console.log('Order confirmed:', response);
        alert('Order confirmed successfully!');
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error confirming order:', error);
        alert('Error confirming order. Please try again.');
      }
    );
  }
}