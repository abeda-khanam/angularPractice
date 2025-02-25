import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { PRODUCTS } from '../data/products';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SearchComponent, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products = PRODUCTS;

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
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
