import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SearchComponent, FilterComponent, RouterModule, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  addedProducts: Set<number> = new Set();
  isAdmin = false;
  selectedProduct: any = null;
  showModal = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {
    this.isAdmin = this.authService.getRole() === 'admin';
    this.productService.products$.subscribe(
      (products) => (this.products = products)
    );
  }

  ngOnInit(): void {
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

  /** ✅ Open Add Product Modal */
  openModal() {
    this.selectedProduct = null;
    this.showModal = true;
  }

  /** ✅ Open Edit Product Modal */
  editProduct(product: any) {
    this.selectedProduct = { ...product };
    this.showModal = true;
  }

  /** ✅ Delete Product */
  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
  }

  /** ✅ Close Modal */
  closeModal() {
    this.showModal = false;
  }
}
