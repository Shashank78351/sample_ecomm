import { HttpClient,HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../product-list/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/backend';
  public cartAddedSubject = new BehaviorSubject<Product[]>([]);
  cartItems$=this.cartAddedSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/productsById/${productId}`);
  }
  
  addToCart(productId: number) : Observable<any>  {
    console.log("Added to the cart",productId);
    return this.http.get<any>(`${this.apiUrl}/addToCart/${productId} `);
  }
  fetchCartItems():void{
    this.http.get<Product[]>(`${this.apiUrl}/fetchCartItems`).subscribe((data)=>{
      this.cartAddedSubject.next(data);
    },
    (error)=>{
      console.error('error fetching cart items', error);
      this.cartAddedSubject.next([]);
    }
  );
  }
  removeFromCart(cartId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeFromCart/${cartId}`);
  }
  confirmOrder(orderData:{username:string,email:string}):Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmOrder`, orderData);
  }
  getUserOrders(email: string): Observable<any> {
    let params = new HttpParams().set('email', email);
    return this.http.get(`${this.apiUrl}/orders`, { params });
  }    
  clearCart(): void {
    this.cartAddedSubject.next([]);
  }
  getProducts(search?: string, category?: string, priceCondition?: string, priceValue?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (search) {
      params = params.append('search', search);
    }
    if (category) {
      params = params.append('category', category);
    }
    if (priceCondition && priceValue!==undefined) {
      params = params.append('priceCondition', priceCondition);
      params = params.append('priceValue', priceValue.toString());
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }  
}
