import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from './product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
products:Product[] = [];
cart:Product[]=[];
cartItems:Product[]=[];
search: string = '';
category: string = '';
priceCondition: string = '';
priceValue: number | null = null;

constructor(private productService:ProductService, private router:Router){}
 
ngOnInit() {
    console.log("Fetching products.....");
    this.productService.getProducts().subscribe((products:Product[])=>{
      this.products=products;
    });
    this.getProducts();
  }
 
  loadProducts() {  
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
    
  } 
  addToCart(productId: number) {
    console.log("Product Added to cart", productId);
    this.productService.addToCart(productId).subscribe((data: Product[]) => {
      this.cartItems = data;  
    }); 
    
  }
  getProducts(): void {
    const price=this.priceValue !== null? this.priceValue:undefined;
    this.productService.getProducts(this.search, this.category, this.priceCondition, price)
      .subscribe(
        data => this.products = data,
        error => console.error('Error fetching products:', error)
      );
  }
  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.search = inputElement.value;
  }
 
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.category = selectElement.value;
  }
 
  onPriceConditionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.priceCondition = selectElement.value;
  }
 
  onPriceValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.priceValue = inputElement.value ? parseFloat(inputElement.value) : null;
  }
 
  applyFilters() {
    this.getProducts();
  }
  logout(){
    localStorage.removeItem('email');
    this.router.navigateByUrl('/login');
  }
  viewOrders():void{
    this.router.navigateByUrl('/orders');
  }
  
}

  