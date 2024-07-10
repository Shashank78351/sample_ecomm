import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  signup(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
 
    this.authService.signup(this.username, this.email, this.password).subscribe(
      () => {
        alert('User registered successfully');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Signup error:', error);
        alert('Signup failed');
      }
    );
  }
}