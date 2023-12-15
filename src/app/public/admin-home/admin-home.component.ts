import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  constructor(private router: Router) {
    this.firstOpen = true;
  }

  firstOpen

  navigateTo(route: string): void {
    if (this.firstOpen) {
      this.firstOpen = false;
    }
    this.router.navigate(['/admin-home', route]);
  }
}

