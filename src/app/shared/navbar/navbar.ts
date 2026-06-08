import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { ProductsService } from '../../services/products';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { CheckoutService } from '../../services/checkout';
import { AuthService } from '../../services/auth';
import { CommonModule, NgIf } from '@angular/common';
register();

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule, NgIf, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Navbar {
removeItem(id: number) {
  this.cartService.removeItem(id);
}

  products: any[] = [];
  categories: string[] = [];
  filteredProducts: any[] = [];
searchTerm: string = '';
cartItems: any[] = [];
loginin:boolean=false;
  constructor(
    private cd: ChangeDetectorRef,
    private service: ProductsService,
    private router: Router,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private authservice:AuthService
  ) {}

  ngOnInit() {

    this.service.getCategories().subscribe((res) => {
      this.categories = res;
    });

    this.service.getProducts().subscribe((res: any) => {
      this.products = res;
       this.filteredProducts = res;
      this.cd.detectChanges();
    });

     this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;
  });
this.loginin=this.authservice.isLoggedIn();
  }

  selectCategory(category: string) {
  this.service.getProductsByCategory(category)
    .subscribe((res: any) => {
      this.filteredProducts = res;
    });
}

  // navigateToProduct(productId: number) {
  //   this.router.navigate(['/product', productId]);
  // }


  navigateToProduct(id: number) {
  const modalElement = document.getElementById('exampleModal');

  if (modalElement) {
    const modal = (window as any).bootstrap.Modal.getInstance(modalElement);

    modalElement.addEventListener(
      'hidden.bs.modal',
      () => {
        this.router.navigate(['/product', id]);
      },
      { once: true }
    );

    modal?.hide();
  } else {
    this.router.navigate(['/product', id]);
  }
}

  searchProducts() {

  this.filteredProducts = this.products.filter(product =>
    product.title.toLowerCase()
      .includes(this.searchTerm.toLowerCase())
  );

}
goToCart() {
  const offcanvasElement = document.getElementById('offcanvasExample');

  if (offcanvasElement) {
    const offcanvas =
      (window as any).bootstrap.Offcanvas.getOrCreateInstance(
        offcanvasElement
      );

    offcanvas.hide();

    offcanvasElement.addEventListener(
      'hidden.bs.offcanvas',
      () => {
        this.router.navigate(['/cart']);
      },
      { once: true }
    );
  } else {
    this.router.navigate(['/cart']);
  }
}


increaseQuantity(id: number) {
  this.cartService.increaseQuantity(id);
}

decreaseQuantity(id: number) {
  this.cartService.decreaseQuantity(id);
}

get subtotal(): number {
  return this.cartItems.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);
}

addSuggestedProduct(product: any) {
  this.cartService.addToCart(product);
}
goToCheckout() {
  this.checkoutService.setCart(this.cartItems);
  this.router.navigate(['/checkout']);
}
goToOrders() {
  this.router.navigate(['/orders']);
}
goTmyprofile() {
  this.router.navigate(['/Myprofile']);
}
logout(){
  this.authservice.logout();
   this.router.navigate(['/']);
}
}