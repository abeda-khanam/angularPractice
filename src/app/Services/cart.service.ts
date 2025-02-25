import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PRODUCTS } from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0); //will add to navbar later
  cartCount$ = this.cartCount.asObservable(); //for navbar

  constructor() {}

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
    this.updateCartCount();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCartCount();
  }

  updateQuantity(productId: number, quantity: number) {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      product.quantity = quantity > 0 ? quantity : 1;
    }
    this.updateCartCount();
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  updateCartCount() { //for navbar
    this.cartCount.next(
      this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    );
  }
}
