import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://172.174.141.97:32000';

  constructor(private http: HttpClient) { }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, email, password });
  }

  login(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, email, password });
  }
}
