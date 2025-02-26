import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null); //admin, user
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticated.asObservable();
  userRole$ = this.userRole.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private router: Router) {
    const sessionUser = sessionStorage.getItem('sessionUser');
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);
      this.isAuthenticated.next(true);
      this.userRole.next(userData.role);
      this.isAdminSubject.next(userData.role === 'admin');
    }
  }

  getCurrentUser() {
    const sessionUser = sessionStorage.getItem('sessionUser');
    return sessionUser ? JSON.parse(sessionUser) : null;
  }

  register(
    name: string,
    username: string,
    password: string,
    role: string
  ): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the username already exists
    if (users.some((user: any) => user.username === username)) {
      return false; // Username already taken
    }

    const newUser = { name, username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // ✅ Store all users in localStorage
    return true;
  }

  login(username: string, password: string, role: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (user: any) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );

    if (user) {
      sessionStorage.setItem(
        'sessionUser',
        JSON.stringify({ username, role: user.role })
      );
      this.isAuthenticated.next(true);
      this.userRole.next(user.role);
      this.isAdminSubject.next(user.role === 'admin');
      return true; // Login successful
    }
    return false; // Login failed
  }

  logout() {
    sessionStorage.removeItem('sessionUser'); // ✅ Clear session data
    this.isAuthenticated.next(false);
    this.userRole.next(null);
    this.isAdminSubject.next(false);
    this.router.navigate(['/Home']);
  }

  getRole() {
    return this.userRole.getValue();
  }

  isLoggedIn() {
    return this.isAuthenticated.getValue();
  }

  isAdmin() {
    return this.isAdminSubject.getValue();
  }
}
