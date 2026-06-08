import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products';

@Component({
  selector: 'app-forgotpassword',
  imports: [],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword implements OnInit {
   products: any;
  fixedProduct: any;

   constructor(
    private router: Router,
    private service: ProductsService,   // ✅ هنا الصح
    private cd: ChangeDetectorRef
  ) {}


   ngOnInit() {
    this.service.getProducts().subscribe((res: any) => {
      this.products = res;

      if (this.products?.length) {
        this.fixedProduct = this.products[0];
      }

      this.cd.detectChanges();
    });
  }
}
