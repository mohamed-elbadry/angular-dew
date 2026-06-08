import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private isLoggedInSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private baseUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, {
      username,
      password
    }).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}