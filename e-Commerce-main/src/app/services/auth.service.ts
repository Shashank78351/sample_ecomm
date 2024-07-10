import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:3002/';
 
  constructor(private http: HttpClient) { }
 
  signup(username: string, email: string, password: string): Observable<any> {
return this.http.post(`http://localhost:3002/signup`, { username, email, password });
  }
 
  login(username: string,email:string, password: string): Observable<any> {
return this.http.post(`http://localhost:3002/login`, { username,email, password });
  }
}