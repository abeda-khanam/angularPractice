import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: ContainerComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Product', component: ProductsComponent },
  { path: '**', component: ErrorComponent }, //should be last route always
];
