import { Component } from '@angular/core';
import { UserValidateModel } from 'src/app/models/user.validate.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
