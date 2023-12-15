import { Component } from '@angular/core';
import { SocketWebService } from 'src/app/services/socketWeb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  userId = JSON.parse(localStorage.getItem('datas-session')!).user._id;

  constructor(
    private socketWebService: SocketWebService,
    private router: Router
  ) { 
    this.firstOpen = true;
  }

  ngOnInit() {
    this.socketWebService.connection(this.userId);
  }

  firstOpen

  navigateTo(route: string): void {
    if (this.firstOpen) {
      this.firstOpen = false;
    }
    this.router.navigate(['/admin-home', route]);
  }
}

