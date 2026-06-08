import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductsService } from '../services/products';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Product implements OnInit {

  product: any = null;
products: any[] = [];
  productImages: string[] = [];

  selectedImage: string = '';
  router: any;

  constructor(private productsService: ProductsService,private cr: ChangeDetectorRef,private route: ActivatedRoute,private cartService: CartService) {}

//   ngOnInit(): void {
//       const id = Number(this.route.snapshot.paramMap.get('id'));

//   this.productsService.getProductById(id).subscribe(product => {
//     this.product = product;
//     console.log(this.product);
//     this.selectedImage = this.product?.image || '';
//     this.cr.detectChanges();

//   });
//     this.productsService.getProducts().subscribe((res: any) => {
//       this.products = res;
//       console.log(this.products);
//       this.cr.detectChanges();
//     });

// }


ngOnInit(): void {

  this.route.paramMap.subscribe(params => {

    const id = Number(params.get('id'));

    this.productsService.getProductById(id).subscribe(product => {

      this.product = product;
      this.selectedImage = this.product?.image || '';

      this.cr.detectChanges();
    });

  });

  this.productsService.getProducts().subscribe((res: any) => {
    this.products = res;
  });

}

  changeImage(image: string): void {
    this.selectedImage = image;
    this.cr.detectChanges();
  }

  navigateToProduct(productId: number) {
     this.router.navigate(['/product', productId]);
   
  }

  addToCart() {
  if (this.product) {
    this.cartService.addToCart(this.product);
  }
}
}