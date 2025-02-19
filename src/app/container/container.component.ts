import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NotificationComponent } from '../notification/notification.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [HeaderComponent, NotificationComponent, ProductsComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {}
