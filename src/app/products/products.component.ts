import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { PRODUCTS } from '../data/products';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SearchComponent, FilterComponent, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products = PRODUCTS;
  addedProducts: Set<number> = new Set();
  isAdmin$!: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin$;
    this.loadAddedProducts();
  }

  private loadAddedProducts() {
    const cartItems = this.cartService.getCart();
    cartItems.forEach((item) => {
      this.addedProducts.add(item.id);
    });
  }

  addToCart(product: any) {
    if (!this.authService.isLoggedIn()) {
      sessionStorage.setItem('pendingProduct', JSON.stringify(product));
      sessionStorage.setItem('lastPage', this.router.url);
      this.router.navigate(['/Login']);
    } else {
      if (this.addedProducts.has(product.id)) {
        this.cartService.removeFromCart(product.id); // 🔹 Remove if already added
        this.addedProducts.delete(product.id);
      } else {
        this.cartService.addToCart(product); // 🔹 Add if not already added
        this.addedProducts.add(product.id);
      }
    }
  }

  getTotalProducts() {
    return this.products.length;
  }
  getInStockProducts() {
    return this.products.filter(
      (product) => product.availability === 'In Stock'
    ).length;
  }
  getOutOfStockProducts() {
    return this.products.filter(
      (product) => product.availability === 'Out of Stock'
    ).length;
  }
  productCountRadioButton: string = 'All';
  searchText: string = '';
  onFilterRadioButtonChanged(data: string) {
    this.productCountRadioButton = data;
    // console.log(this.productCountRadioButton);
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }
}
