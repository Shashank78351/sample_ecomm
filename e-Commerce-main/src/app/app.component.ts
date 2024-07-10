import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { Product } from './product-list/product.model';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  cartItems: Product[] = [];
 
  constructor(private router: Router, private productService: ProductService) {}
 
  ngOnInit(): void {
    // Subscribe to cart items observable
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
 
    // Fetch initial cart items
    this.productService.fetchCartItems();
  }
 
  redirectToSale() {
    this.router.navigateByUrl("/sale");
  }
}