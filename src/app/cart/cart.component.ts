import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: any[] = [];
  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.getCart();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCart();
  }

  updateQuantity(productId: number, event: any) {
    this.cartService.updateQuantity(productId, event.target.value);
    this.cartItems = this.cartService.getCart();
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  goToCheckout() {
    this.router.navigate(['/Cart/Checkout']);
  }
}
