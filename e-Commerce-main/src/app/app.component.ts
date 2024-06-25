import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { Product } from './product-list/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  cartItems: Product[] = [];
  products:Product[] = [];
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {}

  redirectToSale() {
    this.router.navigateByUrl("/sale");
  }
}
