import { Component } from '@angular/core';
import { UserValidateModel } from 'src/app/models/user.validate.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private securityService: SecurityService
  ) {
    
  }

  activeSession: boolean = false;

  ngOnInit() {
    this.sessionValidate();
  }

  sessionValidate() {
    this.securityService.GetSessionData().subscribe({
      next: (datas:UserValidateModel) => {
        if (datas.token != "") {
          this.activeSession = true;
        } else {
          this.activeSession = false;
        }
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  

}
