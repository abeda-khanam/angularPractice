import { Component } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: any[] = [];
  constructor(private cartService: CartService) {
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
}
