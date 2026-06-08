import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { ProductsService } from '../services/products';
import { CommonModule } from '@angular/common';


register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent  {
randomProduct: any;

  constructor(
  private cd: ChangeDetectorRef,
    private service: ProductsService ,  // 👈 هنا ضيفتها
    private router: Router  // 👈 هنا ضيفتها
  ) {}

  

  products: any[] = [];   // 👈 دي بدل الهاردكود اللي عندك
  featuredProduct: any = null;
  customers = [
    {
      name: 'ساره العليان',
      date: '01/02/2025',
      image: 'img/landing/lama.png',
      review: 'قسم بالله المجموعة الأساسية صابونية التفتيح وكريم التفتيح حل سحري...',
      stars: [1, 2, 3, 4, 5]
    },
    {
      name: 'ريم ابراهيم',
      date: '01/02/2025',
      image: 'img/landing/lama.png',
      review: 'يجننننن يفتح ويقشع الطبقة السطحية...',
      stars: [1, 2, 3, 4, 5]
    },
    {
      name: 'لمى الفوزان',
      date: '01/02/2025',
      image: 'img/landing/lama.png',
      review: 'من 2021 ما رجعت بشرتي قطعة وحدة...',
      stars: [1, 2, 3, 4, 5]
    },
    {
      name: 'ساره العليان',
      date: '01/02/2025',
      image: 'img/landing/lama.png',
      review: 'قسم بالله المجموعة الأساسية صابونية التفتيح وكريم التفتيح حل سحري...',
      stars: [1, 2, 3, 4, 5]
    },
    {
      name: 'ريم ابراهيم',
      date: '01/02/2025',
      image: 'img/landing/lama.png',
      review: 'يجننننن يفتح ويقشع الطبقة السطحية...',
      stars: [1, 2, 3, 4, 5]
    },
    {
      name: 'لمى الفوزان',
      date: '01/02/2025',
      image: 'img/landing/lama.png',
      review: 'من 2021 ما رجعت بشرتي قطعة وحدة...',
      stars: [1, 2, 3, 4, 5]
    }
  ];


//  ngOnInit() {
//   this.service.getProducts().subscribe((res: any) => {
//     this.products = res;
//     console.log('Featured Product:', this.products);

//     const randomIndex = Math.floor(
//       Math.random() * this.products.length
//     );

//     this.featuredProduct = this.products[randomIndex];

//     console.log('Featured Product:', this.featuredProduct);

//     this.cd.detectChanges();
//   });
// }


ngOnInit() {
  this.service.getProducts().subscribe((res: any) => {
    this.products = res;

    if (this.products.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.products.length);
      this.featuredProduct = this.products[randomIndex];
    }

    this.cd.detectChanges();
  });
}
  navigateToProduct(productId: number) {
     this.router.navigate(['/product', productId]);
   
  }

 

  truncateTitle(title: string, limit: number = 20): string {
    if (!title) return '';
    return title.length > limit ? title.slice(0, limit) + '...' : title;
  }

}