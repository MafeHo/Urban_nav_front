import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {

  constructor(
    private securityService: SecurityService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.signOut();
  }

  signOut() {
    this.securityService.RemoveUserDataValidate();
    this.router.navigate([""]);
  }
}
