import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserValidateModel } from 'src/app/models/user.validate.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private securityService: SecurityService,
    private router: Router
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
          this.securityService.identifyAnUserByRole(datas.user!.roleId!).subscribe({
            next: (datas:any) => {
              if (datas.name == "Driver") {
                this.router.navigate(['/driver-home']);
              } else if (datas.name == "Admin") {
                this.router.navigate(['/admin-home']);
              }
              else {
                this.router.navigate(['/home']);
              }
            },
            error: (err:any) => {
              console.log(err);
            }
          });
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
