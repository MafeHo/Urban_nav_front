import { Component } from '@angular/core';
import { SocketWebService } from 'src/app/services/socketWeb.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  userId = JSON.parse(localStorage.getItem('datas-session')!).user._id;

  constructor(
    private socketWebService: SocketWebService,
  ) { }

  ngOnInit() {
    this.socketWebService.connection(this.userId);
  }
}
