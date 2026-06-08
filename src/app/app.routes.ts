import { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
     {
        path: '',
        loadComponent: () => import('./home/home').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () =>
          import('./about/about').then(m => m.About)
    },
    {
        path: 'shop',
        loadComponent: () =>
          import('./shop/shop').then(m => m.Shop)
    },
    {
        path: 'product/:id',
        loadComponent: () =>
          import('./product/product').then(m => m.Product)
    },
    {
        path: 'login',
        loadComponent: () =>
          import('./login/login').then(m => m.Login)
    },
    {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart').then(m => m.Cart),
          canActivate: [authGuard]
    },
      {
    path: 'register',
    loadComponent: () =>
      import('./register/register').then(m => m.Register)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgotpassword/forgotpassword').then(m => m.Forgotpassword)
  },
  {
  path: 'payment-success',
  loadComponent: () =>
    import('./payment-success/payment-success')
      .then(m => m.PaymentSuccess)
},
{ path: 'orders', 
  loadComponent: () => 
    import('./order/order')
  .then(m => m.OrderComponent) 
},
  { path: 'OrderDetails', 
  loadComponent: () => 
    import('./order-details/order-details')
  .then(m => m.OrderDetails) 
},
 { path: 'Myprofile', 
  loadComponent: () => 
    import('./myprofile/myprofile')
  .then(m => m.Myprofile) 
},
{
  path: 'skin',
  loadComponent: () =>
    import('./skin/skin')
  .then(m => m.Skin)
},
{
  path: 'privacy',
  loadComponent: () =>
    import('./privacy/privacy')
  .then(m => m.Privacy)
},
{
  path: 'Term',
  loadComponent: () =>
    import('./term/term')
  .then(m => m.Term)
}
];
