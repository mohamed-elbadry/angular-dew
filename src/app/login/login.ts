import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule],
})
export class Login implements OnInit {

  email: string = '';
  password: string = '';
showPassword: boolean = false;
  fixedProduct: any = null;
  products: any[] = [];

  constructor(
    private router: Router,
    private service: ProductsService,   // ✅ هنا الصح
    private cd: ChangeDetectorRef,
     private authService: AuthService
  ) {}

 ngOnInit() {
   console.log('LOGIN LOADED');
 const isFirstTime = !localStorage.getItem('login_seen_toast');

if (isFirstTime) {
  this.showToast('Go to register 👇');
  localStorage.setItem('login_seen_toast', 'true');
}

  this.service.getProducts().subscribe((res: any) => {
    this.products = res;

    if (this.products?.length) {
      this.fixedProduct = this.products[0];
    }

    this.cd.detectChanges();
  });
}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goTopassword() {
    this.router.navigate(['/forgot-password']);
  }


  showToast(message: string) {
  const toast = document.createElement('div');

  toast.innerText = message;

  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#111';
  toast.style.color = '#fff';
  toast.style.padding = '12px 18px';
  toast.style.borderRadius = '12px';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '99999';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';
  toast.style.transition = '0.3s ease';

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
  }, 2500);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

onLogin() {
  this.authService.login(this.email, this.password).subscribe({
    next: () => {
      this.showToast('Login success');

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    },
    error: () => {
      this.showToast('Invalid credentials');
    }
  });
}
}