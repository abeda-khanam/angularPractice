import { Component } from '@angular/core';
import { Customer } from './customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  selectedCustomer!: Customer;
  customers: Customer[] = [
    { customerNo: 101, name: 'John Doe', address: '123 Main St', city: 'New York', country: 'USA' },
    { customerNo: 102, name: 'Alice Johnson', address: '456 Oak St', city: 'Los Angeles', country: 'USA' },
    { customerNo: 103, name: 'David Smith', address: '789 Pine St', city: 'London', country: 'UK' },
    { customerNo: 104, name: 'Sophia Lee', address: '159 Maple St', city: 'Sydney', country: 'Australia' },
    { customerNo: 105, name: 'Liam Brown', address: '753 Elm St', city: 'Toronto', country: 'Canada' }
  ];
}
