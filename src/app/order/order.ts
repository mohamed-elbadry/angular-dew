import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OrdersService } from '../services/order';

export interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];

  constructor(
  private router: Router,
  private ordersService: OrdersService
) {}

ngOnInit() {
  this.orders = this.ordersService.getOrders();
}

 

  goToOrderdetails() {
    this.router.navigate(['/OrderDetails']);
  }

  goToorder() {
    this.router.navigate(['/orders']);
  }

  goTmyprofile() {
    this.router.navigate(['/Myprofile']);
  }

  viewOrder(order: Order) {
    localStorage.setItem('selectedOrder', JSON.stringify(order));
    this.router.navigate(['/OrderDetails']);
  }
}