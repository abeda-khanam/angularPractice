import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RoleGuard } from './gaurds/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: ContainerComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Product', component: ProductsComponent },
  { path: 'Cart', component: CartComponent, canActivate: [AuthGuard] },
  //loginreg
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  //customer
  {
    path: 'Dashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' },
  },

  { path: '**', component: ErrorComponent }, //should be last route always
];
