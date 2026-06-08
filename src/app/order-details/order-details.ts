import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit{


  order: any;
  items: any[] = [];
  ngOnInit() {

    this.order = JSON.parse(
      localStorage.getItem('selectedOrder') || '{}'
    );

    this.items = this.order.items || [];

    console.log(this.order);
  }

  getTotal(item: any) {
    return item.price * (item.quantity || 1);
  }
}
