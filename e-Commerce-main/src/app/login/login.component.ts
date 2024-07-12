import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  email='';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  login(): void {
    this.authService.login(this.username,this.email, this.password).subscribe(
      (response) => {
        this.router.navigate(['/products']);
        localStorage.setItem('username',this.username);
        localStorage.setItem('email',this.email);
        console.log("Logged in user",localStorage.getItem('username'));
        alert('Login successful');  
      },
      (error) => {
        console.error('Login error:', error);
        alert('Invalid email or password');
      }
    );
  }
}