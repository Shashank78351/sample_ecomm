import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product-list/product.model';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: Product[] = [];
 
  constructor(private productService: ProductService, private router:Router) { }
 
  ngOnInit(): void {
    const email = localStorage.getItem('email');
    const username=localStorage.getItem('username');
 
    if (!email ) {
      alert('No User found. Please login again.');
      return ; 
    }
 
    this.productService.getUserOrders( email).subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders. Please try again.');
      }
    );
  }
}