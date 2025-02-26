import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  sitename: string = 'eShopping'; // string interpolation
  isAuthenticated$!: boolean;
  cartCount$: Observable<number>;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.cartCount$ = this.cartService.cartCount$;
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated$ = authStatus;
    });
    this.authService.isAdmin$.subscribe((adminStatus) => {
      this.isAdmin = adminStatus; // 🔹 Store boolean value
    });
  }

  logout() {
    this.authService.logout();
  }
}
