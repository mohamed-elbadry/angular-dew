import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { CheckoutService } from '../services/checkout';
import { ProductsService } from '../services/products';
import { CommonModule } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { CartService } from '../services/cart';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrdersService } from '../services/order';
register();

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Cart implements OnInit {
  
addToCart(item: any) {
  const current = this.checkoutService.getCart();
  this.checkoutService.setCart([...current, item]);
}

  cartItems: any[] = [];
  products: any[] = [];

  // 👇 هنا جمّعنا الاتنين مع بعض
  constructor(
    private checkoutService: CheckoutService,
    private productService: ProductsService,
    private cartService: CartService,
    private http: HttpClient,
     private cd: ChangeDetectorRef,
      private ordersService: OrdersService,
  ) {}

  

  ngOnInit() {
    // cart items
    this.cartItems = this.checkoutService.getCart();
    console.log(this.cartItems);

    // recommended products (2 فقط)
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res.slice(0, 2);
    });
     this.cd.detectChanges();
  }

  // total price
  get totalPrice() {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
  }

  async pay() {

  const order = {
    id: Date.now(),
    date: new Date(),
    status: 'Pending',
    total: this.totalPrice,
    items: [...this.cartItems]
  };

  localStorage.setItem(
  'pendingOrder',
  JSON.stringify(order)
);

  const stripe = await loadStripe(
    environment.stripePublishableKey
  );

  this.checkoutService
    .createSession(this.cartItems)
    .subscribe((session: any) => {

      window.location.href = session.url;

    });
}
}