import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  product: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      const productId = Number(params['id']);
      this.product = PRODUCTS.find((p) => p.id === productId);
    });
  }

  goBack() {
    this.router.navigate(['/Product']);
  }
}
