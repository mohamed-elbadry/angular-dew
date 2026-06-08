// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  setCart(cartItems: any[]) {
    throw new Error('Method not implemented.');
  }

  private cartItems = new BehaviorSubject<any[]>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  );

  cartItems$ = this.cartItems.asObservable();

  private updateCart(items: any[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  addToCart(product: any) {
    const items = [...this.cartItems.value];

    const existingItem = items.find(
      item => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({
        ...product,
        quantity: 1
      });
    }

    this.updateCart(items);
  }

  getCartItems() {
    return this.cartItems.value;
  }

  removeItem(id: number) {
    const items = this.cartItems.value.filter(
      item => item.id !== id
    );

    this.updateCart(items);
  }

  increaseQuantity(id: number) {
    const items = [...this.cartItems.value];

    const item = items.find(
      x => x.id === id
    );

    if (item) {
      item.quantity++;
    }

    this.updateCart(items);
  }

  decreaseQuantity(id: number) {
  const items = [...this.cartItems.value];

  const item = items.find(x => x.id === id);

  if (item && item.quantity > 1) {
    item.quantity--;
    this.updateCart(items);
  }
}

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

}