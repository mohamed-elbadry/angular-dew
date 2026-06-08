import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-skin',
  templateUrl: './skin.html',
  styleUrl: './skin.css',
  imports: [RouterLink, NgFor, FormsModule, CommonModule]
})
export class Skin implements OnInit, OnDestroy {

  products: any[] = [];
  filteredProducts: any[] = [];

  featuredProduct: any;
  giftProduct: any;

  categories: string[] = [];
  selectedCategory: string = 'all';

  constructor(
    private cd: ChangeDetectorRef,
    private service: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Shop Init');
    this.loadProducts();
  }

  // ✅ Load Products
  loadProducts() {
    this.service.getProducts().subscribe({
      next: (res: any) => {

        this.products = res || [];
        this.filteredProducts = [...this.products];

        // استخراج الكاتيجوريز بدون تكرار
        this.categories = [
          'all',
          ...new Set(this.products.map(p => p.category))
        ];

        // منتجات عشوائية
        if (this.products.length > 0) {

          const randomIndex1 = Math.floor(Math.random() * this.products.length);
          this.giftProduct = this.products[randomIndex1];

          const randomIndex2 = Math.floor(Math.random() * this.products.length);
          this.featuredProduct = this.products[randomIndex2];
        }

        this.cd.detectChanges();
      },

      error: (err) => {
        console.error('API ERROR:', err);

        this.products = [];
        this.filteredProducts = [];
        this.categories = [];
        this.giftProduct = null;
        this.featuredProduct = null;
      }
    });
  }

  // ✅ Filter by Category (MAIN FILTER)
  filterByCategory(category: string) {
    this.selectedCategory = category;

    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        p => p.category === category
      );
    }
  }

  // ✅ Optional Search (لو حابب تسيبه)
  applyFilter() {
    const text = this.searchText?.toLowerCase().trim() || '';

    let data = [...this.products];

    // فلترة الكاتيجوري الأول
    if (this.selectedCategory !== 'all') {
      data = data.filter(p => p.category === this.selectedCategory);
    }

    // بعدين البحث
    this.filteredProducts = data.filter(product =>
      product.title?.toLowerCase().includes(text) ||
      product.category?.toLowerCase().includes(text)
    );
  }

  searchText: string = '';

  // ✅ Navigation
  navigateToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  ngOnDestroy() {
    console.log('Shop Destroy');
  }
}