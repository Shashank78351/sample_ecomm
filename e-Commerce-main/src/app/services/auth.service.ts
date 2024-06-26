import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:3002/'; // Adjust the URL as per your backend setup
 
  constructor(private http: HttpClient) { }
 
  signup(username: string, email: string, password: string): Observable<any> {
return this.http.post(`http://localhost:3002/signup`, { username, email, password });
  }
 
  login(email: string, password: string): Observable<any> {
return this.http.post(`http://localhost:3002/login`, { email, password });
  }
 
  // To store the token in local storage
  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }
 
  // // To get the token from local storage
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
}