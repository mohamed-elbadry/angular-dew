import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  products: any;
  fixedProduct: any;
  step: number = 1;
  firstName: string = '';
  lastName: string = '';
  mobile: string = '';
  email: string = '';
  password: string = '';
  submitted: boolean = false;

  constructor(
    private router: Router,
    private service: ProductsService,
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

 onRegister() {

  this.submitted = true;

  // check validation
  if (
    !this.firstName ||
    !this.lastName ||
    !this.mobile ||
    !this.email ||
    !this.password
  ) {
    this.showToast('Please fill all fields');
    return;
  }

  const user = {
    firstName: this.firstName,
    lastName: this.lastName,
    mobile: this.mobile,
    email: this.email,
    password: this.password
  };

  localStorage.setItem('user', JSON.stringify(user));

  this.showToast('Registered Successfully');
 setTimeout(() => {
    this.router.navigate(['/login']);
  }, 1500);
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
    toast.style.borderRadius = '10px';
    toast.style.zIndex = '99999';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }


  nextStep() {

  if (this.step === 1 && this.firstName) {
    this.step = 2;
    this.showToast('Enter Last Name');
  }

  else if (this.step === 2 && this.lastName) {
    this.step = 3;
    this.showToast('Enter Mobile Number');
  }

  else if (this.step === 3 && this.mobile) {
    this.step = 4;
    this.showToast('Enter Email');
  }

  else if (this.step === 4 && this.email) {
    this.step = 5;
    this.showToast('Enter Password');
  }
}
}