import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  username = '';
  password = '';
  role = 'customer'; // Default role
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (
      this.authService.register(
        this.name,
        this.username,
        this.password,
        this.role
      )
    ) {
      this.router.navigate(['Login']);
    } else {
      this.errorMessage = 'Username already taken';
    }
  }
}
