import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }
  getProductById(id: number) {
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }
  // جميع الكاتيجوريز
  getCategories() {
    return this.http.get<string[]>(
      'https://fakestoreapi.com/products/categories'
    );
  }
  // منتجات كاتيجوري معينة
  getProductsByCategory(category: string) {
    return this.http.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
  }
  login(username: string, password: string) {
  return this.http.post('https://fakestoreapi.com/auth/login', {
    username,
    password
  });
}
}