import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SearchComponent, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      name: 'Smartphone X',
      price: 799,
      color: 'Black',
      availability: 'In Stock',
      image: 'https://via.placeholder.com/150?text=Smartphone+X',
    },
    {
      id: 2,
      name: 'Gaming Laptop Z',
      price: 1499,
      color: 'Silver',
      availability: 'Out of Stock',
      image: 'https://via.placeholder.com/150?text=Gaming+Laptop+Z',
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      price: 199,
      color: 'Blue',
      availability: 'In Stock',
      image: 'https://via.placeholder.com/150?text=Wireless+Headphones',
    },
    {
      id: 4,
      name: 'Smartwatch Pro',
      price: 299,
      color: 'Rose Gold',
      availability: 'Out of Stock',
      image: 'https://via.placeholder.com/150?text=Smartwatch+Pro',
    },
    {
      id: 5,
      name: '4K LED TV',
      price: 999,
      color: 'Black',
      availability: 'In Stock',
      image: 'https://via.placeholder.com/150?text=4K+LED+TV',
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      price: 89,
      color: 'Red',
      availability: 'In Stock',
      image: 'https://via.placeholder.com/150?text=Bluetooth+Speaker',
    },
  ];

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
