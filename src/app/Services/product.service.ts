import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PRODUCTS } from '../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: any[] = [];

  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor() {
    this.loadProducts();
  }

  /** ✅ Load products from localStorage */
  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      this.products = PRODUCTS; // Load default products
      this.saveProducts(); // Save to localStorage
    }
    this.productsSubject.next(this.products);
  }

  /** ✅ Get all products */
  getProducts() {
    return this.products;
  }

  /** ✅ Add a new product */
  addProduct(product: any) {
    product.id = this.products.length + 1;
    this.products.push(product);
    this.saveProducts();
  }

  /** ✅ Edit an existing product */
  editProduct(updatedProduct: any) {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveProducts();
    }
  }

  /** ✅ Delete a product */
  deleteProduct(productId: number) {
    this.products = this.products.filter((p) => p.id !== productId);
    this.saveProducts();
  }

  /** ✅ Save products to localStorage */
  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
    this.productsSubject.next(this.products);
  }

  reduceQuantity(productId: number, quantity: number) {
    const product = this.products.find((p) => p.id === productId);
    if (product && product.quantity >= quantity) {
      product.quantity -= quantity;
      product.availability = product.quantity > 0 ? 'In Stock' : 'Out of Stock';
      this.saveProducts();
    }
  }
}
