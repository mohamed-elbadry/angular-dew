import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) {}

  getAbout() {
    return this.http.get('YOUR_API_URL/about');
  }
}