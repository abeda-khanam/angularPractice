import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  role = 'customer'; // Default role
  errorMessage = '';
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      const pendingProduct = sessionStorage.getItem('pendingProduct');
      const lastPage = sessionStorage.getItem('lastPage') || '/Home';
      if (pendingProduct) {
        const product = JSON.parse(pendingProduct);
        this.cartService.addToCart(product);

        sessionStorage.removeItem('pendingProduct');
        sessionStorage.removeItem('lastPage');
      }
      this.cartService.loadCart();
      this.router.navigate([lastPage]);
    } else {
      this.errorMessage = 'Invalid Credentials';
    }
  }
}
