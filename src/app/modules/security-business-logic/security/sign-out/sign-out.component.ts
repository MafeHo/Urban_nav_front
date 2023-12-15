import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { SocketWebService } from 'src/app/services/socketWeb.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {

  constructor(
    private socketWebService: SocketWebService,
    private securityService: SecurityService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.signOut();
    this.socketWebService.closeSocket();
  }

  signOut() {
    this.securityService.RemoveUserDataValidate();
    this.router.navigate([""]);
  }
}
