import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  login(): void {
this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // this.authService.setToken(response.token);
        this.router.navigate(['/products']);
        alert('Login successful');
        //this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login error:', error);
        alert('Invalid email or password');
      }
    );
  }
}