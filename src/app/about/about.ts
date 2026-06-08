import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products';
import { AboutService } from '../services/about.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  imports: [RouterLink, CommonModule],
  styleUrl: './about.css',
})
export class About implements OnInit {

  about: any;
  products: any[] = [];
 featuredProduct: any;
whoProduct: any;

  constructor(
    private cd: ChangeDetectorRef,
    private aboutService: AboutService,
    private productsService: ProductsService,
    private router: Router
  ) {}

 ngOnInit() {
  console.log('About component loaded');

  this.productsService.getProducts().subscribe((res: any) => {

  this.products = res;

  if (this.products.length > 1) {

    const index1 = Math.floor(Math.random() * this.products.length);
    this.featuredProduct = this.products[index1];
this.cd.detectChanges();
    let index2 = Math.floor(Math.random() * this.products.length);

    // نتأكد إنهم مختلفين
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * this.products.length);
    }

    this.whoProduct = this.products[index2];
this.cd.detectChanges();

  }
});

//   this.productsService.getProducts().subscribe({
//     next: (res: any) => {
//       console.log('API Response:', res);

//       this.products = res;

//       if (this.products?.length > 0) {
//         const randomIndex = Math.floor(Math.random() * this.products.length);
//         this.featuredProduct = this.products[randomIndex];
// this.cd.detectChanges();
//         console.log('Featured:', this.featuredProduct);
//       }
//     },

//     error: (err) => {
//       console.error('API Error:', err);
//     }
//   });
}

  navigateToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}