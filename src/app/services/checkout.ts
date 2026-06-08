import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(private http: HttpClient) {}
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  setCart(items: any[]) {
  this.cartSubject.next(items);
  localStorage.setItem('cart', JSON.stringify(items));
}

getCart() {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : this.cartSubject.value;
}
  createSession(products: any[]) {
    return this.http.post(
      `${environment.apiUrl}/create-checkout-session`,
      { products }
    );
  }
}