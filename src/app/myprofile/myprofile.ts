import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  imports: [],
  templateUrl: './myprofile.html',
  styleUrl: './myprofile.css',
})
export class Myprofile {
 constructor(
    
    private router: Router,
   
  ) {}
goToorder() {
  this.router.navigate(['/orders']);
}

  goTmyprofile() {
  this.router.navigate(['/Myprofile']);
}
}
