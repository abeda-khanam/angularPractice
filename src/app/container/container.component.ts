import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NotificationComponent } from '../notification/notification.component';
import { ProductsComponent } from '../products/products.component';
import { CustomerListComponent } from "../customer-list/customer-list.component";
import { ViewchildComponent } from "../viewchild/viewchild.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [HeaderComponent, NotificationComponent, ProductsComponent, CustomerListComponent, ViewchildComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {}
