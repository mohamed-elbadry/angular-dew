import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products';
import { RouterLink, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, NgFor,],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit, OnDestroy {
  featuredProduct: any;
truncateTitle(title: string, limit: number = 20): string {
  if (!title) return '';
  return title.length > limit ? title.slice(0, limit) + '...' : title;
}
 


  constructor(
    private cd: ChangeDetectorRef,
    private service: ProductsService,
    private router: Router
  ) {}
  products: any[] = [];
  giftProduct: any = null;

  ngOnInit() {
  console.log('Shop Init');

  this.service.getProducts().subscribe({
    next: (res: any) => {
      console.log('API RESPONSE:', res);

      this.products = res || [];

      if (this.products.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.products.length);
        this.giftProduct = this.products[randomIndex];
        this.cd.detectChanges();
      } else {
        this.giftProduct = null;
      }

      console.log('Gift Product:', this.giftProduct);
    },
    error: (err) => {
      console.error('API ERROR:', err);
      this.giftProduct = null;
    }
  });

  this.service.getProducts().subscribe((res: any) => {
    this.products = res;

    if (this.products.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.products.length);
      this.featuredProduct = this.products[randomIndex];
    }

    this.cd.detectChanges();
  });
}


  ngOnDestroy() {
    console.log('Shop Destroy');
  }
   navigateToProduct(productId: number) {
     this.router.navigate(['/product', productId]);
   
  }
}