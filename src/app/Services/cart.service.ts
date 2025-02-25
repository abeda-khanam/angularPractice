import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0); //will add to navbar later
  cartCount$ = this.cartCount.asObservable(); //for navbar
  private currentUser: string | null = null;

  constructor(private authService: AuthService) {
    this.loadCart();
  }

  loadCart() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUser = user.username;
      const storedCart = localStorage.getItem(`cart_${this.currentUser}`);
      this.cartItems = storedCart ? JSON.parse(storedCart) : [];
      this.updateCartCount();
    }
  }

  private saveCart() {
    if (this.currentUser) {
      localStorage.setItem(
        `cart_${this.currentUser}`,
        JSON.stringify(this.cartItems)
      );
    }
  }

  getCart() {
    return this.cartItems;
  }

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCart();
    this.updateCartCount();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
  }

  updateQuantity(productId: number, quantity: number) {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      product.quantity = quantity > 0 ? quantity : 1;
    }
    this.saveCart();
    this.updateCartCount();
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  updateCartCount() {
    //for navbar
    this.cartCount.next(
      this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    );
  }

  //clear cart on checkout??
  // clearCart() {
  //   this.cartItems = [];
  //   if (this.currentUser) {
  //     localStorage.removeItem(`cart_${this.currentUser}`);
  //   }
  //   this.updateCartCount();
  // }
}
