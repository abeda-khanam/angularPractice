import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RoleGuard } from './gaurds/role.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: ContainerComponent },
  { path: 'Contact', component: ContactComponent },
  {
    path: 'Product',
    component: ProductsComponent,
  },
  { path: 'Product/:id', component: ProductDetailsComponent },
  {
    path: 'Cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  //loginreg
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },

  {
    path: 'Admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
    children: [{ path: 'Product', component: ProductsComponent }],
  },

  { path: '**', component: ErrorComponent }, //should be last route always
];
