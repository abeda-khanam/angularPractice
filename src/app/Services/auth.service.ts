import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null); //admin, user

  isAuthenticated$ = this.isAuthenticated.asObservable();
  userRole$ = this.userRole.asObservable();

  constructor() {
    // Load auth status from localStorage
    // const storedUser = localStorage.getItem('user');
    const sessionUser = sessionStorage.getItem('sessionUser');
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);
      this.isAuthenticated.next(true);
      this.userRole.next(userData.role);
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
      (user: any) => user.username === username && user.password === password && user.role === role
    );

    if (user) {
      sessionStorage.setItem(
        'sessionUser',
        JSON.stringify({ username, role: user.role })
      ); // ✅ Store session data
      this.isAuthenticated.next(true);
      this.userRole.next(user.role);
      return true; // Login successful
    }
    return false; // Login failed
  }

  logout() {
    sessionStorage.removeItem('sessionUser'); // ✅ Clear session data
    this.isAuthenticated.next(false);
    this.userRole.next(null);
  }

  getRole() {
    return this.userRole.getValue();
  }

  isLoggedIn() {
    return this.isAuthenticated.getValue();
  }
}
