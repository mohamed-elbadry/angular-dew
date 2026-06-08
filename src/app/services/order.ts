// orders.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: any[] = JSON.parse(
    localStorage.getItem('orders') || '[]'
  );
  router: any;

  addOrder(order: any) {
      this.orders.push(order);

    localStorage.setItem(
      'orders',
      JSON.stringify(this.orders)
    );
  }

  getOrders() {
    return this.orders;
  }
 
}