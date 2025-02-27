import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnChanges {
  @Input() product: any;
  @Output() closeModal = new EventEmitter<void>();

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    color: new FormControl('', Validators.required),
    quantity: new FormControl(1, Validators.required),
  });

  constructor(private productService: ProductService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        color: this.product.color,
        quantity: this.product.quantity,
      });
    }
  }

  submitForm() {
    if (this.product) {
      this.productService.editProduct({
        id: this.product.id,
        ...this.productForm.value,
      });
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.closeModal.emit();
  }
}
