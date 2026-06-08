import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart';
import { OrdersService } from '../services/order';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  imports: [RouterLink],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccess implements OnInit {

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {

    const order = JSON.parse(
      localStorage.getItem('pendingOrder') || '{}'
    );

    if (order?.id) {
      this.ordersService.addOrder(order);
      localStorage.removeItem('pendingOrder');
    }

    this.cartService.clearCart();
  }

}